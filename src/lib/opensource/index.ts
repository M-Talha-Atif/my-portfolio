import { OpenSourceContribution } from './types'

// All merged open source contributions. `featured: true` entries are the
// ones surfaced in the homepage "Top 5", the rest only appear on the full
// /open-source listing page.
export const openSourceContributions: OpenSourceContribution[] = [
  {
    slug: 'checkstyle-18807',
    repo: 'Apache Checkstyle',
    repoUrl: 'https://github.com/checkstyle/checkstyle',
    prNumber: '#18807',
    prUrl: 'https://github.com/checkstyle/checkstyle/pull/18807',
    title: 'Documentation contribution',
    summary:
      'Documentation contribution to a Java static analysis tool used by thousands of production projects.',
    impact:
      'Contributed to a widely used Apache-governed project, working within an established open source review process rather than my own conventions.',
    technologies: ['Java', 'Documentation', 'Open Source Governance'],
    category: 'Documentation',
    linesAdded: 0,
    linesRemoved: 0,
    merged: true,
    featured: true,
  },
  {
    slug: 'opensre-3702',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#3702',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/3702',
    title: 'Centralize scattered exception handling into a named hierarchy',
    summary:
      'Refactored scattered exception handling into a centralized, named exception hierarchy with a single safe_execute() boundary.',
    impact:
      'Improved auditability of fallback behavior in the agent harness by giving every failure path a name and a single place it passes through, instead of ad hoc try/except blocks scattered across the codebase.',
    technologies: ['Python', 'Error Handling', 'Refactor'],
    category: 'Refactor',
    linesAdded: 0,
    linesRemoved: 0,
    merged: true,
    featured: true,
  },
  {
    slug: 'opensre-3620',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#3620',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/3620',
    title: 'Fix stale documentation paths after module reorganization',
    summary: 'Fixed stale documentation paths after an internal module reorganization.',
    impact: 'Scoped precisely to the reported issue rather than a broader documentation sweep.',
    technologies: ['Python', 'Documentation'],
    category: 'Documentation',
    linesAdded: 0,
    linesRemoved: 0,
    merged: true,
    featured: false,
  },
  {
    slug: 'opensre-3618',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#3618',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/3618',
    title: 'Remove legacy constant while preserving migration support',
    summary: 'Removed a legacy constant no longer in use.',
    impact:
      'Preserved backward compatible migration support for older installs, taking care not to break uninstall cleanup for anyone still on an old version.',
    technologies: ['Python', 'Backward Compatibility'],
    category: 'Cleanup',
    linesAdded: 0,
    linesRemoved: 0,
    merged: true,
    featured: false,
  },
  {
    slug: 'opensre-4434',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#4434',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/4434',
    title: 'Remove unused Telegram gateway startup helper',
    summary:
      'Removed a dead Telegram gateway startup helper function that had no remaining call sites.',
    impact:
      'Traced the function through git history to confirm it was truly orphaned rather than needing to be rewired back in. Found that its only caller was deleted in an earlier refactor, and that the Telegram gateway now runs as its own daemon process. Rewiring it back in would have caused two processes polling the same Telegram bot at once, which Telegram\'s API does not allow, so removing it was the correct call, not a guess.',
    technologies: ['Python', 'Telegram', 'Distributed Systems'],
    category: 'Dead Code Removal',
    linesAdded: 1,
    linesRemoved: 69,
    merged: true,
    featured: true,
  },
  {
    slug: 'opensre-4444',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#4444',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/4444',
    title: 'State the cache-stats contract in docstrings',
    summary:
      'Rewrote vague docstrings on a cache-stats value type so they state the real contract instead of a generic description.',
    impact:
      'Checked all three real call sites before writing anything, so the documented contract matches actual behavior rather than a guess. Made an implicit rule (callers fill in exactly one of two mutually exclusive field groups depending on their caching strategy) explicit for the first time, even though that rule already existed in the code.',
    technologies: ['Python', 'Documentation', 'API Design'],
    category: 'Documentation',
    linesAdded: 24,
    linesRemoved: 3,
    merged: true,
    featured: true,
  },
  {
    slug: 'opensre-4458',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#4458',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/4458',
    title: 'Remove comments that only restate the next line (Azure SQL)',
    summary: 'Cleaned up banner comments in the Azure SQL integration that added no information.',
    impact:
      'Removed only comments that restated the very next line, while deliberately keeping every comment documenting a real constraint, read-only guarantees, result caps, and Azure-specific DMVs that do not exist on-prem.',
    technologies: ['Python', 'Azure SQL', 'Code Quality'],
    category: 'Code Quality',
    linesAdded: 0,
    linesRemoved: 7,
    merged: true,
    featured: false,
  },
  {
    slug: 'opensre-4459',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#4459',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/4459',
    title: 'Remove comments that only restate the next line (messaging security)',
    summary: 'Cleaned up banner comments in a messaging security module.',
    impact:
      'Preserved every comment explaining an actual security rule, why the chat-ID check has to run before the pairing check to prevent a bypass, the cache invalidation contract, and why the HMAC fallback key is derived from the hostname, while removing only comments that added no information beyond the next line.',
    technologies: ['Python', 'Security', 'Code Quality'],
    category: 'Code Quality',
    linesAdded: 0,
    linesRemoved: 8,
    merged: true,
    featured: true,
  },
  {
    slug: 'opensre-4460',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#4460',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/4460',
    title: 'Spell out RabbitMQ timeout constant unit',
    summary: 'Renamed a timeout constant to spell out its unit, matching the rest of the module.',
    impact: 'Verified the constant\'s single use site before renaming, keeping the change scoped and behavior-preserving.',
    technologies: ['Python', 'RabbitMQ', 'Naming Conventions'],
    category: 'Code Quality',
    linesAdded: 2,
    linesRemoved: 2,
    merged: true,
    featured: false,
  },
  {
    slug: 'opensre-4461',
    repo: 'OpenSRE (Tracer Cloud)',
    repoUrl: 'https://github.com/Tracer-Cloud/opensre',
    prNumber: '#4461',
    prUrl: 'https://github.com/Tracer-Cloud/opensre/pull/4461',
    title: 'Spell out session event poll constant unit',
    summary: 'Renamed a CLI poll timeout constant to spell out its unit.',
    impact:
      'Identified a same-named but unrelated constant living in a different, unconnected file and correctly left it untouched, keeping the change scoped to exactly what the issue asked for instead of over-reaching.',
    technologies: ['Python', 'CLI', 'Naming Conventions'],
    category: 'Code Quality',
    linesAdded: 2,
    linesRemoved: 2,
    merged: true,
    featured: false,
  },
]

export function getFeaturedContributions(): OpenSourceContribution[] {
  return openSourceContributions.filter((c) => c.featured)
}

export function getAllTechnologies(): string[] {
  const set = new Set<string>()
  openSourceContributions.forEach((c) => c.technologies.forEach((t) => set.add(t)))
  return Array.from(set).sort()
}

export function getAllCategories(): string[] {
  const set = new Set<string>()
  openSourceContributions.forEach((c) => set.add(c.category))
  return Array.from(set).sort()
}
