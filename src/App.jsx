// App.jsx — Taxis Provençale Aix V2
import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { useAnimations } from './hooks/useAnimations'

gsap.registerPlugin(ScrollTrigger)
import { SchemaOrg } from './seo/SchemaOrg'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import PhoneFloat from './components/ui/PhoneFloat'
import CursorFollower from './components/ui/CursorFollower'

// Homepage — above-the-fold (eagerly loaded)
import FlotteVideo from './components/sections/FlotteVideo'
import HeroAlt from './components/sections/HeroAlt'
import SectionDivider from './components/ui/SectionDivider'
import SEOHead from './seo/SEOHead'

// Homepage — below-the-fold (lazy loaded)
const About = lazy(() => import('./components/sections/About'))
const Services = lazy(() => import('./components/sections/Services'))
const Flotte = lazy(() => import('./components/sections/Flotte'))
const Avis = lazy(() => import('./components/sections/Avis'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const BandeauCTA = lazy(() => import('./components/sections/BandeauCTA'))
const PartnersBar = lazy(() => import('./components/sections/PartnersBar'))
const DevisSimulateur = lazy(() => import('./components/sections/DevisSimulateur'))
const ChiffresImpact = lazy(() => import('./components/sections/ChiffresImpact'))

// Dedicated pages — lazy loaded (code-split)
const FlottePage = lazy(() => import('./pages/FlottePage'))
const AProposPage = lazy(() => import('./pages/AProposPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'))

function HomePage() {
  return (
    <main>
      <SEOHead
        path="/"
        title="Taxi Aix-en-Provence | VTC & Chauffeur privé 24h/24 — Taxis Provençale Aix"
        description="Taxi et chauffeur privé VTC à Aix-en-Provence. Mercedes Classe S, E et V. Transfert aéroport Marseille-Provence Marignane, gare TGV Aix, tourisme Luberon, Gordes, Cassis. Tarif fixe garanti, disponible 24h/24 7j/7. ☎ 06 15 96 32 75."
      />
      <FlotteVideo />
      <HeroAlt />
      <Suspense fallback={null}>
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
      </Suspense>
    </main>
  )
}

export default function App() {
  useLenis()
  useAnimations()
  const { pathname } = useLocation()

  // Refresh ScrollTrigger après chaque changement de route
  // (les positions sont recalculées pour la nouvelle page)
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <SchemaOrg />
      <ScrollToTop />
      <Nav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/flotte" element={<FlottePage />} />
          <Route path="/a-propos" element={<AProposPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <PhoneFloat hide={pathname === '/contact'} />
      <CursorFollower />
    </>
  )
}
