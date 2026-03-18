import { Project } from './types'

// Lightweight metadata for listing page (NO heavy data)
export const projectsMetadata = [
  {
    slug: 'memingo',
    title: 'Memingo — AI-Powered Language Learning Platform',
    short: 'Revolutionizing language learning through AR, AI, and gamification',
    hero: '/memingoProject/hero/heroMemingo.png',
    platforms: ['web', 'mobile'] as ('web' | 'mobile')[],
    tech: ['React.js', 'Kotlin', 'Flask', 'MongoDB'],
    live: 'https://memingo-frontend-sooty.vercel.app/',
  },
  {
    slug: 'moodly',
    title: 'Moodly — AI-Powered Mood-Based Experience Discovery Platform',
    short: 'Revolutionizing experience discovery through emotion AI',
    hero: '/moodlyProject/hero/moodly-hero-2.png',
    platforms: ['mobile'] as ('web' | 'mobile')[],
    tech: ['React Native', 'Nest.js', 'PostgreSQL'],
    live: 'https://appetize.io/app/b_jy4luvflr2e72c53yqdcpewubu',
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
    return null
  } catch (error) {
    console.error('Error loading project:', error)
    return null
  }
}