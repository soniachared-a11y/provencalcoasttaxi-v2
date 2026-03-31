// App.jsx — Provençal Coast Taxi V2
// Point d'entrée principal — importe et orchestre toutes les sections
import { useLenis } from './hooks/useLenis'
import { useAnimations } from './hooks/useAnimations'
import { SchemaOrg } from './seo/SchemaOrg'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Atouts from './components/sections/Atouts'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Flotte from './components/sections/Flotte'
import Zones from './components/sections/Zones'
import Avis from './components/sections/Avis'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import BandeauCTA from './components/sections/BandeauCTA'
import HeroAlt from './components/sections/HeroAlt'
import PartnersBar from './components/sections/PartnersBar'
import ServicesAlt from './components/sections/ServicesAlt'
import Experience from './components/sections/Experience'
import FlotteAlt from './components/sections/FlotteAlt'
import DevisSimulateur from './components/sections/DevisSimulateur'
import ChiffresImpact from './components/sections/ChiffresImpact'
import AvisAlt from './components/sections/AvisAlt'
import PhoneFloat from './components/ui/PhoneFloat'
import SectionDivider from './components/ui/SectionDivider'
import CursorFollower from './components/ui/CursorFollower'

export default function App() {
  // Initialise Lenis smooth scroll + GSAP ticker
  useLenis()
  // Animations globales Awwwards (parallaxe, reveals, fade-ups, stagger)
  useAnimations()

  return (
    <>
      <SchemaOrg />
      <Nav />
      <main>
        <Hero />
        <HeroAlt />
        <PartnersBar />
        <Atouts />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <ServicesAlt />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Flotte />
        <SectionDivider />
        <FlotteAlt />
        <SectionDivider />
        <Zones />
        <SectionDivider />
        <ChiffresImpact />
        <SectionDivider />
        <DevisSimulateur />
        <SectionDivider />
        <Avis />
        <SectionDivider />
        <AvisAlt />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Contact />
        <BandeauCTA />
      </main>
      <Footer />
      <PhoneFloat />
      <CursorFollower />
    </>
  )
}
