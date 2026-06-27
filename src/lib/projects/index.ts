import { Project } from './types'

// Lightweight metadata for listing page (NO heavy data)
export const projectsMetadata = [
  {
    slug: 'intimec',
    title: 'Intimec IGA, Enterprise Identity Governance and Administration Platform',
    short: 'Production-grade IAM platform for enterprise access management, compliance, and identity lifecycle automation',
    hero: '/intimecProject/hero/hero.png',
    platforms: ['web'] as ('web' | 'mobile')[],
    tech: ['Java', 'Spring Boot', 'Kafka', 'Next.js', 'PostgreSQL', 'OpenSearch', 'gRPC', 'Multi Tenant'],
    live: 'https://youtu.be/OK640zuXBr8',
  },
  {
    slug: 'moodly',
    title: 'Moodly, AI-Powered Mood-Based Experience Discovery Platform',
    short: 'Revolutionizing experience discovery through emotion AI',
    hero: '/moodlyProject/hero/moodly-hero.png?v=20260625',
    platforms: ['mobile'] as ('web' | 'mobile')[],
    tech: ['React Native', 'Nest.js', 'RabbitMQ', 'PostgreSQL', 'Redis'],
    live: 'https://youtu.be/oe8ZT5kMd_c',
  },
  {
    slug: 'cunocovo',
    title: 'Cunocovo, Social Platform for Creative Professionals',
    short: 'Connecting photographers, videographers, and creative professionals through a production-grade social platform',
    hero: '/cunocovoProject/hero/hero.png?v=20260625',
    platforms: ['web'] as ('web' | 'mobile')[],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Express.js', 'Plunk.js'],
    live: 'https://cc-prod-user.fly.dev/',
  },
  {
    slug: 'memingo',
    title: 'Memingo, AI-Powered Language Learning Platform',
    short: 'Revolutionizing language learning through AR, AI, and gamification',
    hero: '/memingoProject/hero/heroMemingo.png',
    platforms: ['web', 'mobile'] as ('web' | 'mobile')[],
    tech: ['React.js', 'Jetpack Compose', 'Flask', 'MongoDB', 'Redis', 'YOLO', 'Three.js'],
    live: 'https://youtu.be/a1Akh-M-9LY',
  }
]

// Dynamic import function
export async function getProject(slug: string): Promise<Project | null> {
  try {
    if (slug === 'memingo') {
      const { memingoProject } = await import('./memingo')
      return memingoProject
    }
    if (slug === 'moodly') {
      const { moodlyProject } = await import('./moodly')
      return moodlyProject
    }
    if (slug === 'cunocovo') {
      const { cunocovoProject } = await import('./cunocovo')
      return cunocovoProject
    }
    if (slug === 'intimec') {
      const { intimecProject } = await import('./intimec')
      return intimecProject
    }
    return null
  } catch (error) {
    console.error('Error loading project:', error)
    return null
  }
}