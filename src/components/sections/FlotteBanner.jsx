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
      gsap.from('.fb-title', { opacity: 0, y: 52, duration: 1.1, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.fb-desc',  { opacity: 0, y: 32, duration: 0.9, delay: 0.2,  ease: 'power3.out', scrollTrigger: st })
      gsap.from('.fb-btn',   { opacity: 0, y: 20, duration: 0.8, delay: 0.38, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.fb-van',     { x: 100, opacity: 0, duration: 1.6, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.fb-berline', { x: 60,  opacity: 0, duration: 1.5, delay: 0.15, ease: 'power3.out', scrollTrigger: st })
      gsap.to('.fb-van',     { yPercent: -5, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
        maxWidth: 1400,
        margin: '0 auto',
      }}>

        {/* ── GAUCHE : texte ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '100px 40px 100px 80px',
          position: 'relative',
          zIndex: 2,
        }}>
          <h2 className="fb-title" style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            fontWeight: 400,
            color: '#F6F3EE',
            lineHeight: 1.13,
            margin: '0 0 28px',
          }}>
            Véhicules adaptés pour toute taille de groupe
          </h2>

          <p className="fb-desc" style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'rgba(246,243,238,0.5)',
            lineHeight: 1.9,
            margin: '0 0 48px',
            maxWidth: 400,
          }}>
            Berline confort, Classe S prestige ou van 7 places — notre flotte Mercedes répond à chaque besoin, du transfert aéroport à la journée événementielle en Provence.
          </p>

          <div>
            <a href="#flotte" className="fb-btn" style={{
              display: 'inline-block',
              fontFamily: 'Sora, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              color: DARK,
              background: '#F6F3EE',
              padding: '16px 40px',
              textDecoration: 'none',
              transition: 'opacity 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.82' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Découvrir notre flotte
            </a>
          </div>
        </div>

        {/* ── DROITE : véhicules PNG transparents ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>

          {/* Van — grand, fond */}
          <img
            src="/images/classe-v-detour.png"
            alt="Mercedes Classe V — Van premium 7 places"
            className="fb-van"
            style={{
              position: 'absolute',
              left: '-8%',
              bottom: '-4%',
              height: '108%',
              width: 'auto',
            }}
          />

          {/* Berline — premier plan droite */}
          <img
            src="/images/classe-s-detour.png"
            alt="Mercedes Classe S — Berline prestige"
            className="fb-berline"
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
