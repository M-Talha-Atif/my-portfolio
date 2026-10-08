#!/usr/bin/env node
/**
 * Repo malware tripwire. Zero dependencies, read-only, never executes repo code.
 *
 *   node scripts/security/check-repo.mjs [--root <dir>] [--json]
 *
 * Exit code 1 if anything suspicious is found. Runs in: git pre-commit/pre-push, CI (every branch),
 * and before `dev` / `build` (so a poisoned commit fails the Vercel build and never deploys).
 *
 * It targets the attack that hit this repo: obfuscated loaders hidden in config files, payloads
 * disguised as fonts/images, and editor tasks that auto-run them when the folder is opened.
 * IOC strings are assembled at runtime so this file does not trip its own rules.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const args = process.argv.slice(2)
const ROOT = args.includes('--root') ? args[args.indexOf('--root') + 1] : process.cwd()
const AS_JSON = args.includes('--json')

// ---------- policy (edit deliberately; these files are CODEOWNERS-protected) ----------
const ALLOWED_BUILD_DEPS = new Set(['sharp', 'core-js', 'unrs-resolver']) // pnpm.onlyBuiltDependencies
const ALLOWED_CONFIG_HOSTS = ['posthog.com', 'vercel.com', 'w3.org', 'nextjs.org', 'tailwindcss.com', 'github.com', 'schemastore.org']
const MAX_LINE = 2000
const EXEC_ALLOWED_DIRS = ['scripts/security/'] // only place a shebang / exec bit is acceptable

// ---------- helpers ----------
const G = 'glo' + 'bal'
const RX = {
  marker: new RegExp(`${G}\\s*\\[\\s*['"\`]!['"\`]\\s*\\]`),
  hexIdent: /\b_0x[0-9a-f]{3,6}\b/g,
  hexEscapes: /(?:\\x[0-9a-fA-F]{2}){10,}/,
  hiddenPayload: /\S[ \t]{40,}\S/,
  dangerousCode: new RegExp(['\\beva' + 'l\\s*\\(', 'new\\s+Func' + 'tion\\s*\\(', 'child_' + 'process', '\\bvm\\.run(?:In\\w+)?\\s*\\(', 'process\\.binding\\s*\\('].join('|')),
  configDanger: new RegExp(
    ['fromCharCode', '\\batob\\s*\\(', "Buffer\\.from\\([^)]*['\"]base64['\"]", "(?:require\\(|from\\s+|import\\()\\s*['\"](?:node:)?(?:net|http|https|dgram|dns|tls|vm|worker_threads|cluster|os|fs|fs/promises)['\"]"].join('|'),
  ),
  exfil: new RegExp(
    [
      'discord(?:app)?\\.com/api/webhooks', 'api\\.telegram\\.org/bot', 'pastebin\\.com', 'paste\\.ee', 'ngrok(?:-free)?\\.(?:io|app|dev)',
      '\\.onion\\b', 'transfer\\.sh', 'anonfiles', 'api\\.ipify\\.org', 'ipinfo\\.io', 'ip-api\\.com', 'jsonkeeper\\.com',
      'npoint\\.io', 'jsonbin\\.io', 'mocki\\.io', 'tinyurl\\.com', 'bit\\.ly/', 'https?://\\d{1,3}(?:\\.\\d{1,3}){3}(?!\\d)',
    ].join('|'),
  ),
}
const CODE_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.mts', '.cts'])
const TEXTISH_EXT = new Set([...CODE_EXT, '.json', '.css', '.scss', '.html', '.yml', '.yaml', '.sh', '.ps1', '.bat', '.cmd', '.toml', '.mdx'])
const MEDIA_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.pdf', '.mp3', '.mp4', '.mov', '.zip'])
const BAD_EXT = new Set(['.exe', '.dll', '.bat', '.cmd', '.com', '.ps1', '.vbs', '.vbe', '.wsf', '.scr', '.msi', '.jar', '.so', '.dylib', '.node', '.lnk', '.hta', '.pif', '.apk', '.appimage', '.bin', '.dmg', '.pkg', '.deb', '.rpm'])
const LOCKFILES = new Set(['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lock'])
const isConfig = (p) => /(^|\/)[^/]*\.config\.(js|cjs|mjs|ts|mts)$/.test(p) || /(^|\/)\.eslintrc(\.[a-z]+)?$/.test(p)

const findings = []
const add = (file, line, rule, detail) => findings.push({ file, line, rule, detail })
const snip = (s) => s.replace(/\s+/g, ' ').slice(0, 90)

function git(...a) {
  return execFileSync('git', a, { cwd: ROOT, maxBuffer: 1 << 28 }).toString('utf8')
}
const entries = git('ls-files', '-s', '-z')
  .split('\0')
  .filter(Boolean)
  .map((r) => {
    const tab = r.indexOf('\t')
    return { mode: r.slice(0, 6), path: r.slice(tab + 1) }
  })

const magicOk = {
  '.woff2': (b) => b.subarray(0, 4).toString('latin1') === 'wOF2',
  '.woff': (b) => b.subarray(0, 4).toString('latin1') === 'wOFF',
  '.ttf': (b) => ['\0\x01\0\0', 'true', 'ttcf', 'OTTO'].includes(b.subarray(0, 4).toString('latin1')),
  '.otf': (b) => ['OTTO', '\0\x01\0\0'].includes(b.subarray(0, 4).toString('latin1')),
  '.eot': (b) => b.length > 36 && b[34] === 0x4c && b[35] === 0x50,
  '.png': (b) => b.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])),
  '.jpg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  '.jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  '.gif': (b) => b.subarray(0, 4).toString('latin1') === 'GIF8',
  '.ico': (b) => b.subarray(0, 4).equals(Buffer.from([0, 0, 1, 0])) || b.subarray(0, 4).equals(Buffer.from([0, 0, 2, 0])),
  '.webp': (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP',
  '.pdf': (b) => b.subarray(0, 4).toString('latin1') === '%PDF',
  '.mp3': (b) => b.subarray(0, 3).toString('latin1') === 'ID3' || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0),
  '.mp4': (b) => b.subarray(4, 8).toString('latin1') === 'ftyp',
  '.mov': (b) => b.subarray(4, 8).toString('latin1') === 'ftyp' || b.subarray(4, 8).toString('latin1') === 'moov',
  '.zip': (b) => b.subarray(0, 2).toString('latin1') === 'PK',
}
const isNativeExec = (b) =>
  b.subarray(0, 2).toString('latin1') === 'MZ' || b.subarray(0, 4).equals(Buffer.from([0x7f, 0x45, 0x4c, 0x46])) ||
  [0xcffaedfe, 0xfeedfacf, 0xcafebabe].includes(b.readUInt32BE(0) >>> 0) && b.length > 8

const allowedHost = (url) => {
  try { const h = new URL(url).hostname; return ALLOWED_CONFIG_HOSTS.some((a) => h === a || h.endsWith('.' + a)) } catch { return false }
}

// ---------- per-file scan ----------
for (const { mode, path } of entries) {
  const abs = join(ROOT, path)
  let st
  try { st = statSync(abs) } catch { continue }
  if (!st.isFile()) continue
  const ext = extname(path).toLowerCase()
  const name = basename(path)
  const inExecDir = EXEC_ALLOWED_DIRS.some((d) => path.startsWith(d))

  if (BAD_EXT.has(ext)) add(path, 0, 'forbidden-file-type', `executable/binary type "${ext}" does not belong in this repo`)
  if (mode === '100755' && !inExecDir) add(path, 0, 'exec-bit', 'file has the executable bit set')
  if (st.size > 25 * 1024 * 1024) { add(path, 0, 'huge-file', `${(st.size / 1048576).toFixed(1)} MB file`); continue }

  const buf = readFileSync(abs)
  if (buf.length === 0) continue

  // disguised / native executables
  if (MEDIA_EXT.has(ext) && magicOk[ext] && !magicOk[ext](buf) && !Object.values(magicOk).some((ok) => ok(buf))) {
    add(path, 0, 'disguised-file', `"${ext}" file whose content is not any real media/font format (starts with: ${snip(buf.subarray(0, 60).toString('latin1'))})`)
  }
  if (buf.length > 8 && isNativeExec(buf)) add(path, 0, 'native-executable', 'compiled executable content')

  const looksBinary = buf.subarray(0, 8000).includes(0)
  if (looksBinary || LOCKFILES.has(name)) {
    if (name === 'pnpm-lock.yaml') scanPnpmLock(path, buf.toString('utf8'))
    continue
  }
  const text = buf.toString('utf8')
  const lines = text.split(/\r?\n/)
  const code = CODE_EXT.has(ext)
  const config = isConfig(path)
  const hook = path.startsWith('.husky/')
  const textish = code || TEXTISH_EXT.has(ext) || hook || ext === '' || ext === '.md'
  // media-extension files that are actually text are already flagged; still scan their content for IOCs
  const scanCodeRules = code || config || MEDIA_EXT.has(ext)

  if (text.startsWith('#!') && !inExecDir && !hook) add(path, 1, 'shebang', 'script header outside the allowed scripts folder')

  const hexIdents = (text.match(RX.hexIdent) || []).length
  if (hexIdents >= 3) add(path, 0, 'obfuscation', `${hexIdents} obfuscator-style identifiers (_0x....)`)

  lines.forEach((ln, i) => {
    const n = i + 1
    if (RX.marker.test(ln)) add(path, n, 'known-malware-marker', snip(ln.replace(/^\s+/, '')))
    if (RX.hexEscapes.test(ln)) add(path, n, 'hex-escaped-string', 'long \\x.. escaped string (obfuscation)')
    if ((code || config || ext === '.json' || ext === '.css' || ext === '.html' || ext === '.yml' || ext === '.yaml' || hook) && ln.length > MAX_LINE) {
      add(path, n, 'very-long-line', `${ln.length} chars; payloads are hidden in minified lines`)
    }
    if ((scanCodeRules || ext === '.json') && ln.length > 200 && RX.hiddenPayload.test(ln)) {
      add(path, n, 'hidden-after-whitespace', 'content pushed off-screen behind a long run of spaces')
    }
    if (code && !inExecDir && RX.dangerousCode.test(ln)) add(path, n, 'dangerous-api', snip(ln.trim()))
    if (config && RX.configDanger.test(ln)) add(path, n, 'dangerous-in-config', snip(ln.trim()))
    if (textish && ext !== '.md' && !inExecDir && RX.exfil.test(ln)) add(path, n, 'exfil-indicator', snip(ln.trim()))
    if (config) {
      for (const m of ln.matchAll(/https?:\/\/[^\s'"`)]+/g)) if (!allowedHost(m[0])) add(path, n, 'unexpected-url-in-config', m[0].slice(0, 80))
    }
  })

  if (hook) scanHook(path, lines)
  if (name === 'package.json') scanPackageJson(path, text)
  if (path.startsWith('.github/workflows/') && /\.ya?ml$/.test(ext)) scanWorkflow(path, lines)
  scanAutorun(path, text)
}

// ---------- specialised scans ----------
function scanHook(path, lines) {
  lines.forEach((ln, i) => {
    const t = ln.trim()
    if (!t || t.startsWith('#')) return
    if (!/^(pnpm|npm|node|npx)\s+[\w:./@=\- ]+(\s*&&\s*(pnpm|npm|node|npx)\s+[\w:./@=\- ]+)*$/.test(t)) add(path, i + 1, 'git-hook-unexpected-command', snip(t))
  })
}

function scanPackageJson(path, text) {
  let pkg
  try { pkg = JSON.parse(text) } catch { return add(path, 0, 'invalid-json', 'package.json does not parse') }
  const LIFECYCLE = ['preinstall', 'install', 'postinstall', 'preuninstall', 'uninstall', 'postuninstall', 'prepublish', 'prepublishOnly', 'publish', 'postpublish', 'preprepare', 'postprepare', 'prepack', 'postpack', 'dependencies']
  for (const [k, v] of Object.entries(pkg.scripts || {})) {
    if (LIFECYCLE.includes(k)) add(path, 0, 'install-lifecycle-script', `scripts.${k} runs automatically on install: "${snip(v)}"`)
    if (k === 'prepare' && v.trim() !== 'husky') add(path, 0, 'install-lifecycle-script', `scripts.prepare must be exactly "husky", found "${snip(v)}"`)
    if (/\b(curl|wget|powershell|cmd\s*\/c|base64|eval)\b|node\s+-e|https?:\/\//i.test(v)) add(path, 0, 'suspicious-script', `scripts.${k}: ${snip(v)}`)
  }
  for (const sect of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [dep, spec] of Object.entries(pkg[sect] || {})) {
      if (/^(https?:|git[+:@]|github:|gitlab:|bitbucket:|file:|link:|ssh:)|\.tgz$|\//.test(String(spec)) && !String(spec).startsWith('npm:')) {
        add(path, 0, 'non-registry-dependency', `${sect}.${dep} = "${spec}" (install from outside the npm registry)`)
      }
    }
  }
  const pn = pkg.pnpm || {}
  for (const dep of pn.onlyBuiltDependencies || []) {
    if (!ALLOWED_BUILD_DEPS.has(dep)) add(path, 0, 'new-build-script-approval', `pnpm.onlyBuiltDependencies adds "${dep}" (allows its install scripts to run). Review, then update ALLOWED_BUILD_DEPS`)
  }
  for (const [k, v] of Object.entries(pn.overrides || {})) {
    if (/^(https?:|git|github:|file:|link:)/.test(String(v))) add(path, 0, 'non-registry-override', `pnpm.overrides["${k}"] = "${v}"`)
  }
  if (pkg.packageManager && !/^pnpm@\d+\.\d+\.\d+/.test(pkg.packageManager)) add(path, 0, 'package-manager', `unexpected packageManager "${pkg.packageManager}"`)
}

function scanPnpmLock(path, text) {
  text.split(/\r?\n/).forEach((ln, i) => {
    const t = /tarball:\s*(\S+)/.exec(ln)
    if (t && !t[1].startsWith('https://registry.npmjs.org/')) add(path, i + 1, 'lockfile-non-registry', `tarball from ${t[1].slice(0, 70)}`)
    if (/resolution:\s*\{[^}]*\b(type:\s*git|repo:|commit:)/.test(ln)) add(path, i + 1, 'lockfile-git-dependency', snip(ln))
  })
}

function scanWorkflow(path, lines) {
  let hasPerms = false
  lines.forEach((ln, i) => {
    const n = i + 1
    if (/^permissions\s*:/.test(ln)) hasPerms = true
    if (/pull_request_target/.test(ln) && !/^\s*#/.test(ln)) add(path, n, 'workflow-pull_request_target', 'runs untrusted PR code with repo secrets')
    const u = /^\s*-?\s*uses:\s*(\S+)/.exec(ln)
    if (u && !u[1].startsWith('./') && !u[1].startsWith('docker://') && !/@[0-9a-f]{40}\b/.test(u[1])) add(path, n, 'workflow-unpinned-action', `${u[1]} is not pinned to a commit SHA`)
    if (/\$\{\{\s*github\.event\.(issue|pull_request|comment|review|head_commit|commits|pages)[^}]*(title|body|message|name|ref|label|email)/.test(ln) && !/^\s*#/.test(ln)) add(path, n, 'workflow-script-injection', snip(ln.trim()))
    if (/\b(curl|wget)\b[^|\n]*\|\s*(sudo\s+)?(ba|z)?sh\b/.test(ln)) add(path, n, 'workflow-pipe-to-shell', snip(ln.trim()))
  })
  if (!hasPerms) add(path, 0, 'workflow-no-permissions', 'missing top-level "permissions:" (defaults are too broad)')
}

function scanAutorun(path, text) {
  const p = path.toLowerCase()
  if (p === '.vscode/tasks.json' && /"runOn"|folderOpen/.test(text)) add(path, 0, 'editor-autorun-task', 'VS Code task set to run when the folder is opened')
  if (p.startsWith('.vscode/') && /"runOn"\s*:\s*"folderOpen"/.test(text)) add(path, 0, 'editor-autorun-task', 'folderOpen task')
  if (p === '.vscode/settings.json') {
    const m = /"task\.allowAutomaticTasks"\s*:\s*("?[A-Za-z]+"?)/.exec(text)
    if (m && m[1] !== '"off"') add(path, 0, 'editor-autorun-enabled', `task.allowAutomaticTasks = ${m[1]} (must be "off")`)
    if (/"security\.workspace\.trust\.enabled"\s*:\s*false/.test(text)) add(path, 0, 'editor-trust-disabled', 'Workspace Trust turned off')
  }
  if (p.startsWith('.devcontainer/') && /"(postCreateCommand|postStartCommand|postAttachCommand|initializeCommand|onCreateCommand|updateContentCommand)"/.test(text)) add(path, 0, 'devcontainer-autorun', 'devcontainer lifecycle command runs on open')
  if (/^\.claude\/(settings(\.local)?\.json)$/.test(p) && /"hooks"|"mcpServers"|enableAllProjectMcpServers/.test(text)) add(path, 0, 'ai-agent-autorun', 'Claude Code hooks/MCP servers in repo settings run commands automatically')
  if ((p === '.mcp.json' || p === '.cursor/mcp.json') && /"command"/.test(text)) add(path, 0, 'ai-agent-autorun', 'MCP server command defined in repo')
  if (p === '.gitmodules') add(path, 0, 'git-submodule', 'submodules pull code from other repos')
}

// ---------- report ----------
if (AS_JSON) {
  console.log(JSON.stringify({ ok: findings.length === 0, scanned: entries.length, findings }, null, 2))
} else if (findings.length === 0) {
  console.log(`security tripwire: OK (${entries.length} tracked files scanned, 0 findings)`)
} else {
  console.error(`\nSECURITY TRIPWIRE FAILED: ${findings.length} finding(s) in ${new Set(findings.map((f) => f.file)).size} file(s)\n`)
  for (const f of findings) console.error(`  [${f.rule}] ${f.file}${f.line ? ':' + f.line : ''}\n      ${f.detail}`)
  console.error('\nDo NOT run, install or build this tree until the findings are understood.\nSee SECURITY.md for the incident checklist.\n')
}
process.exit(findings.length ? 1 : 0)
