import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import FreelanceWork from '@/components/sections/FreelanceWork'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FreelanceWork />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
