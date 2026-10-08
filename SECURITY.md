# Security

## What happened (Oct 2026)

Malware (an obfuscated JavaScript loader, the kind used in fake-job-interview attacks) was found in this repo three times
(removed Aug 27 and Sep 9, reintroduced Oct 7). It lived in three places:

| Where | What it did |
|---|---|
| `tailwind.config.js` line 38 | ~39 KB of obfuscated code hidden behind ~150 spaces after the closing `};`. Runs on every `dev` / `build`. |
| `src/app/api/contact/public/fonts/fa-solid-900.woff2` | Not a font. A second copy of the same JavaScript payload. |
| `.vscode/tasks.json` + `settings.json` | Task set to `runOn: folderOpen` with automatic tasks enabled: running the fake font with `node` the moment the folder is opened in VS Code. |

## Root cause (verified from GitHub's activity log)

It was **not** committed by the owner. A second GitHub account with write access (a collaborator) force-pushed poisoned copies of
the owner's latest commit to `main` and to bot branches 29 times between May 29 and Oct 8, 2026. Each copy was the owner's real
commit with the payload spliced in (same message and author date, committer timezone +0200 instead of the owner's +0500).
The owner then pulled or cloned the poisoned `main` and carried the payload forward in later commits, which looked like
"it came back". Anyone or anything that clones `main` while it is poisoned and then builds or opens it can be infected.

**Permanent fix:** only the owner has write access. Re-check with
`gh api repos/M-Talha-Atif/Portfolio-NEXTJS/collaborators --jq '.[].login'` and see who pushed with
`gh api repos/M-Talha-Atif/Portfolio-NEXTJS/activity --jq '.[] | [.timestamp,.activity_type,.ref,.actor.login] | @tsv'`.

## What now blocks it

| Layer | Where | Stops |
|---|---|---|
| Tripwire scanner | `scripts/security/check-repo.mjs` | Obfuscated loaders, payload-after-whitespace, files that are not what their extension says, auto-run editor/AI-agent tasks, install-time scripts, non-registry deps, exfil hosts, unpinned CI actions |
| Build gate | `pnpm dev` / `pnpm build` run the tripwire first | A poisoned commit fails the Vercel build and **never deploys** |
| Git hooks | `.husky/pre-commit`, `.husky/pre-push` | Local commits and pushes (bypassable by malware on the machine, so not the only layer) |
| CI on every branch | `.github/workflows/security.yml` | Tripwire on every branch tip, ClamAV, Gitleaks (secrets), OSV-Scanner + `pnpm audit` (vulnerable and malicious packages), Semgrep, lint + build with install scripts disabled |
| Supply chain | `.npmrc`, Dependabot, pinned action SHAs | Brand-new (likely malicious) package releases, mutable action tags |
| Ownership | `.github/CODEOWNERS` | Marks every file that can run code |

## Limits (be honest about these)

- This repo is **private on a free plan**: GitHub offers no branch protection or rulesets for that combination. Until you
  upgrade to **GitHub Pro** or make the repo public, nothing on GitHub can *force* the checks to pass before a push to
  `main`. The Vercel build gate and CI alerts still catch and stop deployment. Once upgraded, run
  `scripts/security/enable-branch-protection.sh`.
- Scanners reduce risk; they do not prove a machine or repo is clean. If the developer machine is compromised, an
  attacker can bypass local hooks and push with your credentials.

## If this machine may be infected (do this in order)

1. **Stop** opening this project in VS Code on the affected machine. Do not run `pnpm dev/build` there.
2. From a **different, clean device**: revoke GitHub sessions, personal access tokens and SSH keys; change the GitHub, email and
   Vercel passwords; revoke Vercel/PostHog/npm tokens; rotate `SMTP_*` and any other values in `.env*`.
3. Treat browser-saved passwords, cookies and any crypto wallets on the affected machine as exposed. Move funds, rotate passwords.
4. Scan the affected machine (Microsoft Defender offline scan + a second opinion such as Malwarebytes), and check for
   persistence: Task Scheduler, Run/RunOnce registry keys, Startup folder, unknown `node`/`python` processes, hidden folders in
   the user profile.
5. Check **every other repo and folder** on that machine for the same marker and for `.vscode/tasks.json` files you did not write.
6. Where possible, reinstall the OS or work from a clean machine, then re-clone this repo.
7. Delete infected branches (the old `vercel/react-server-components-cve-*` branch carries the payload too).

## Reporting

Email the repo owner. Do not open a public issue for security problems.
