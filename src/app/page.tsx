import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import ProjectsGrid from '@/components/ProjectsGrid'
import Articles from '@/components/Articles'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-24">
      <section id="about" className="py-20">
        <Hero />
      </section>

      <section id="experience" className="py-20">
        <Experience />
      </section>

      <section id="projects" className="py-20">
        <ProjectsGrid />
      </section>

      <section id="articles" className="py-20">
        <Articles />
      </section>

      <section id="contact" className="py-20">
        <Contact />
      </section>

      <Footer />
    </div>
  )
}
