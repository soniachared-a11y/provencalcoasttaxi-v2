// App.jsx — Taxis Provençal Aix V2
import { Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import { useAnimations } from './hooks/useAnimations'
import { SchemaOrg } from './seo/SchemaOrg'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import PhoneFloat from './components/ui/PhoneFloat'
import CursorFollower from './components/ui/CursorFollower'

// Homepage sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Flotte from './components/sections/Flotte'
import Avis from './components/sections/Avis'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import BandeauCTA from './components/sections/BandeauCTA'
import HeroAlt from './components/sections/HeroAlt'
import PartnersBar from './components/sections/PartnersBar'
import FlotteVideo from './components/sections/FlotteVideo'
import DevisSimulateur from './components/sections/DevisSimulateur'
import ChiffresImpact from './components/sections/ChiffresImpact'
import SectionDivider from './components/ui/SectionDivider'

// Dedicated pages
import FlottePage from './pages/FlottePage'
import AProposPage from './pages/AProposPage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'
import MentionsLegalesPage from './pages/MentionsLegalesPage'

function HomePage() {
  return (
    <main>
      <FlotteVideo />
      <HeroAlt />
      <ChiffresImpact />
      <SectionDivider />
      <About />
      <SectionDivider />
      <PartnersBar />
      <Services />
      <SectionDivider />
      <Flotte />
      <SectionDivider />
      <DevisSimulateur />
      <SectionDivider />
      <Avis />
      <SectionDivider />
      <FAQ />
      <BandeauCTA />
    </main>
  )
}

export default function App() {
  useLenis()
  useAnimations()

  return (
    <>
      <SchemaOrg />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/flotte" element={<FlottePage />} />
        <Route path="/a-propos" element={<AProposPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
      </Routes>
      <Footer />
      <PhoneFloat />
      <CursorFollower />
    </>
  )
}
