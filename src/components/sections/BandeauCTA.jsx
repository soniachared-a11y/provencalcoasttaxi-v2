import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ArrowRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function BandeauCTA() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bandeau-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      // Ken Burns parallax on background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -20,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background lavande */}
      <img
        ref={bgRef}
        src="/images/lavande-provence.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-15% 0',
          width: '100%',
          height: '130%',
          objectFit: 'cover',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(42,42,42,0.55) 0%, rgba(42,42,42,0.7) 100%)',
      }} />

      {/* Content */}
      <div
        className="bandeau-content"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '60px 24px',
          maxWidth: 700,
        }}
      >
        <h2 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 36,
          fontWeight: 400,
          color: '#fff',
          lineHeight: 1.2,
          margin: '0 0 16px 0',
        }}>
          Besoin d'un chauffeur ?
        </h2>
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 14,
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.7,
          margin: '0 0 32px 0',
        }}>
          Réservation simple, confirmation immédiate, tarif fixe garanti. Disponible 24h/24 pour tous vos déplacements en Provence.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="tel:+33615963275"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--olive)',
              color: '#fff',
              padding: '16px 32px',
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Phone size={14} weight="duotone" />
            06 15 96 32 75
          </a>

          <a
            href="#contact"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '16px 32px',
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Réserver en ligne
            <ArrowRight size={14} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  )
}
