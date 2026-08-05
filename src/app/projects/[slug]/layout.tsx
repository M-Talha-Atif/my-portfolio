import type { Metadata } from 'next'
import { getProject } from '@/lib/projects/index'
import { SITE_NAME } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: `Project Not Found | ${SITE_NAME}` }
  }

  const title = `${project.title} | Case Study | ${SITE_NAME}`
  const description = project.short

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      type: 'article',
      images: [{ url: project.hero, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.hero],
    },
  }
}

export default function ProjectLayout({ children }: Props) {
  return children
}
