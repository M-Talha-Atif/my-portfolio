export type OpenSourceContribution = {
  slug: string
  repo: string
  repoUrl: string
  prNumber: string
  prUrl: string
  title: string
  summary: string
  impact: string
  technologies: string[]
  category: string
  linesAdded: number
  linesRemoved: number
  merged: boolean
  featured: boolean
}
