#!/usr/bin/env node
/**
 * Antivirus pass over what is about to be committed or pushed. Zero dependencies, never executes repo code.
 *
 *   node scripts/security/scan-staged.mjs            scan staged files (pre-commit)
 *   node scripts/security/scan-staged.mjs --all      scan every tracked file (pre-push)
 *
 * Uses ClamAV (`clamscan`) when it is installed. The tripwire (check-repo.mjs) always runs next to this in the
 * hooks and covers the known attack pattern; ClamAV adds signature-based detection of known malware families.
 *
 * If ClamAV is missing the hook warns and continues, so a missing tool never blocks work and CI still scans.
 * Set MALWARE_SCAN_REQUIRED=1 to fail instead of warn (recommended on a machine that has ClamAV).
 *
 * Install ClamAV:  Windows: https://www.clamav.net/downloads   macOS: brew install clamav   Debian: apt install clamav
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ALL = process.argv.includes('--all')
const REQUIRED = process.env.MALWARE_SCAN_REQUIRED === '1'

const warn = (msg) => console.warn(`malware-scan: ${msg}`)
const fail = (msg) => {
  console.error(`\nmalware-scan: ${msg}\n`)
  process.exit(1)
}

function git(...args) {
  return execFileSync('git', args, { maxBuffer: 1 << 28 }).toString('utf8')
}

function findClam() {
  for (const bin of ['clamscan', 'clamscan.exe']) {
    const r = spawnSync(bin, ['--version'], { encoding: 'utf8' })
    if (r.status === 0) return bin
  }
  return null
}

const files = (ALL ? git('ls-files', '-z') : git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'))
  .split('\0')
  .filter(Boolean)

if (files.length === 0) process.exit(0)

const clam = findClam()
if (!clam) {
  if (REQUIRED) fail('ClamAV (clamscan) is not installed and MALWARE_SCAN_REQUIRED=1. Install it or unset the variable.')
  warn('ClamAV is not installed, skipping the antivirus pass (the tripwire and CI still run). See scripts/security/scan-staged.mjs.')
  process.exit(0)
}

const dir = mkdtempSync(join(tmpdir(), 'clamlist-'))
try {
  const list = join(dir, 'files.txt')
  writeFileSync(list, files.join('\n') + '\n')
  const r = spawnSync(clam, ['--infected', '--no-summary', '--max-filesize=50M', `--file-list=${list}`], { encoding: 'utf8' })
  if (r.stdout) process.stdout.write(r.stdout)
  if (r.status === 1) fail(`ClamAV flagged ${ALL ? 'tracked' : 'staged'} files as malware. Commit blocked.`)
  if (r.status !== 0) {
    if (REQUIRED) fail(`ClamAV failed (exit ${r.status}): ${(r.stderr || '').trim().slice(0, 300)}`)
    warn(`ClamAV could not complete (exit ${r.status}); not blocking. ${(r.stderr || '').trim().slice(0, 200)}`)
  } else {
    console.log(`malware-scan: ${files.length} file(s) clean`)
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}
