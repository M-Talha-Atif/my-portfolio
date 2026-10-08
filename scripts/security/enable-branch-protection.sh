#!/usr/bin/env bash
# Locks down the repo on GitHub. Run it yourself once, after upgrading to GitHub Pro (or making the repo public):
#   gh auth login            # as the repo owner, with a CLEAN machine (see SECURITY.md)
#   bash scripts/security/enable-branch-protection.sh
# Free private repos cannot use rulesets/branch protection ("Upgrade to GitHub Pro or make this repository public").
set -euo pipefail
REPO="${1:-M-Talha-Atif/Portfolio-NEXTJS}"

echo "== Ruleset 1: default branch (PR required, security-gate must pass, no force-push/delete, linear history)"
gh api -X POST "repos/$REPO/rulesets" --input - <<'JSON'
{
  "name": "protect-default-branch",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [ { "context": "security-gate" } ] } }
  ]
}
JSON

echo "== Ruleset 2: ALL branches (no force-push, no deletion, no history rewrite)"
gh api -X POST "repos/$REPO/rulesets" --input - <<'JSON'
{
  "name": "protect-all-branches",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["~ALL"], "exclude": [] } },
  "rules": [ { "type": "deletion" }, { "type": "non_fast_forward" } ]
}
JSON

echo "== Dependabot alerts + automatic security fixes"
gh api -X PUT "repos/$REPO/vulnerability-alerts"
gh api -X PUT "repos/$REPO/automated-security-fixes"

echo "== Secret scanning + push protection (needs a public repo or GitHub Secret Protection)"
gh api -X PATCH "repos/$REPO" --input - <<'JSON' || echo "(skipped: not available for this repo plan)"
{ "security_and_analysis": {
    "secret_scanning": { "status": "enabled" },
    "secret_scanning_push_protection": { "status": "enabled" } } }
JSON

echo "Done. Also enable: Settings > Actions > General > 'Require approval for all outside collaborators' and Workflow permissions = Read."
