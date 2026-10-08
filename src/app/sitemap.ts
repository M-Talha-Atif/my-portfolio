import type { MetadataRoute } from 'next'
import { projectsMetadata } from '@/lib/projects/index'
import { articlesMetadata } from '@/lib/articles'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projectsMetadata.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const articleEntries = articlesMetadata.map((article) => ({
    url: `${SITE_URL}/writing/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/open-source`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectEntries,
    ...articleEntries,
  ]
}
