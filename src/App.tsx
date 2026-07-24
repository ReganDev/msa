import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Services from './components/Services.tsx'
import Location from './components/Location.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import { useReveal } from './hooks/useReveal.ts'

export default function App() {
  useReveal()

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
