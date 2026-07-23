import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Journey from '@/components/Journey'
import ProjectsGrid from '@/components/ProjectsGrid'
import Footer from '@/components/Footer'
import Achievements from '@/components/Achievements'
import OpenSource from '@/components/OpenSource'
import ContactClientOnly from '@/components/ContactClientOnly'
import Skills from "@/components/Skills"

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-24">
      <section id="about" className="py-12 md:py-16">
        <Hero />
      </section>

      <section id="projects">
        <ProjectsGrid />
      </section>
      
      <section id="experience">
        <Experience />
      </section>
      
      <section id="journey">
        <Journey />
      </section>

      <section id="skills">
        <Skills />
      </section>
      
      <section id="achievements">
        <Achievements />
      </section>

      <section id="opensource">
        <OpenSource />
      </section>

      <ContactClientOnly />

      <Footer />
    </div>
  )
}