// App.jsx — Provençal Coast Taxi V2
// Point d'entrée principal — importe et orchestre toutes les sections
import { useLenis } from './hooks/useLenis'
import { SchemaOrg } from './seo/SchemaOrg'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Atouts from './components/sections/Atouts'
import Services from './components/sections/Services'
import Flotte from './components/sections/Flotte'
import Zones from './components/sections/Zones'
import Avis from './components/sections/Avis'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import PhoneFloat from './components/ui/PhoneFloat'

export default function App() {
  // Initialise Lenis smooth scroll + GSAP ticker
  useLenis()

  return (
    <>
      <SchemaOrg />
      <Nav />
      <main>
        <Hero />
        <Atouts />
        <Services />
        <Flotte />
        <Zones />
        <Avis />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <PhoneFloat />
    </>
  )
}
