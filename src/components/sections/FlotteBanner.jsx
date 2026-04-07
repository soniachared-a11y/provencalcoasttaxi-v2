// FlotteBanner.jsx — Section bannière flotte
// Utilise les PNG transparents (fond blanc retiré par script sharp)
// Voitures noires flottantes sur fond sombre — reproduction fidèle de la référence

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DARK = '#111111'

export default function FlotteBanner() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%', once: true }
      gsap.from('.fb-berline', { x: 60, opacity: 0, duration: 1.5, delay: 0.15, ease: 'power3.out', scrollTrigger: st })
      gsap.to('.fb-berline', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: DARK, position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
    >
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>

        {/* ── Véhicules PNG transparents ── */}
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

          {/* Berline — premier plan droite */}
          <img
            src="/images/classe-s-detour.png"
            alt="Mercedes Classe S — Berline prestige"
            className="fb-berline"
            width={600}
            height={400}
            loading="lazy"
            style={{
              position: 'absolute',
              right: '-4%',
              bottom: '-4%',
              height: '68%',
              width: 'auto',
              zIndex: 2,
            }}
          />

          {/* Fondu bas pour ancrer les voitures dans la section */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
            background: `linear-gradient(to top, ${DARK}, transparent)`,
            zIndex: 5, pointerEvents: 'none',
          }} />
          {/* Fondu gauche */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
            background: `linear-gradient(to right, ${DARK}, transparent)`,
            zIndex: 5, pointerEvents: 'none',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .fb-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
