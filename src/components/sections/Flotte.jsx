import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@phosphor-icons/react'
import { FLOTTE, SECTION_INTROS } from '../../data/content'
import CharReveal from '../ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

function SpecRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      fontFamily: 'Sora, sans-serif',
      fontSize: 13,
    }}>
      <span style={{ color: 'var(--texte-light)' }}>{label}</span>
      <span style={{ color: 'var(--olive)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

export default function Flotte() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.flotte-item', {
        y: 60,
        opacity: 0,
        rotateZ: (i) => (i % 2 === 0 ? -1.5 : 1.5),
        scale: 0.95,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.flotte-grid',
          start: 'top 80%',
          once: true,
        },
      })

      // Blur-in on fleet images
      gsap.from('.flotte-image', {
        filter: 'blur(15px) grayscale(100%)',
        duration: 1.4,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.flotte-grid',
          start: 'top 75%',
          once: true,
        },
      })

      // Parallax on fleet images
      gsap.to('.flotte-image', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="flotte"
      style={{ background: 'var(--surface)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--olive)',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Notre flotte
          </span>
          <CharReveal
            text="Mercedes haut de gamme"
            as="h2"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 36,
              fontWeight: 400,
              color: 'var(--texte)',
              lineHeight: 1.2,
              margin: 0,
            }}
          />
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            maxWidth: 560,
            margin: '20px auto 0',
            textAlign: 'center',
          }}>
            {SECTION_INTROS.flotte}
          </p>
        </div>

        {/* Link to full fleet page */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link
            to="/flotte"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--lavande)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--lavande)',
              paddingBottom: 2,
              transition: 'gap 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.gap = '12px'; e.currentTarget.style.color = 'var(--texte)' }}
            onMouseLeave={e => { e.currentTarget.style.gap = '8px'; e.currentTarget.style.color = 'var(--lavande)' }}
          >
            Découvrir la flotte complète
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Grid */}
        <div
          className="flotte-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid var(--border)',
          }}
        >
          {FLOTTE.map((v, i) => (
            <div
              key={i}
              className="flotte-item"
              style={{
                borderRight: i < FLOTTE.length - 1 ? '1px solid var(--border)' : 'none',
                borderTop: v.phare ? '2px solid var(--lavande)' : 'none',
                background: 'var(--surface)',
                transition: 'background 0.3s ease',
                willChange: 'transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--surface-alt)'
                const interior = e.currentTarget.querySelector('.flotte-interior')
                if (interior) interior.style.opacity = '1'
                const exterior = e.currentTarget.querySelector('.flotte-image')
                if (exterior) exterior.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--surface)'
                const interior = e.currentTarget.querySelector('.flotte-interior')
                if (interior) interior.style.opacity = '0'
                const exterior = e.currentTarget.querySelector('.flotte-image')
                if (exterior) exterior.style.transform = 'scale(1)'
              }}
            >
              {/* Photo with interior crossfade */}
              <div style={{
                height: 240,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={v.image}
                  alt={v.modele}
                  loading="lazy"
                  className="flotte-image"
                  style={{
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                  }}
                />
                {v.imageInterieur && (
                  <img
                    src={v.imageInterieur}
                    alt={`Intérieur ${v.modele}`}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                    }}
                    className="flotte-interior"
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '32px 32px 40px' }}>
                {/* Classe */}
                <span style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--lavande)',
                  display: 'inline-block',
                  marginBottom: 8,
                }}>
                  {v.classe}
                </span>

                {/* Nom */}
                <h3 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: 'var(--texte)',
                  margin: '0 0 24px 0',
                  lineHeight: 1.3,
                }}>
                  {v.modele}
                </h3>

                {/* Description */}
                {v.desc && (
                  <p style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 12,
                    color: 'var(--texte-light)',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                  }}>
                    {v.desc}
                  </p>
                )}

                {/* Specs */}
                <SpecRow label="Passagers" value={v.pax} />
                <SpecRow label="Bagages" value={v.bags} />
                <SpecRow label={v.featureLabel || 'Feature'} value={v.feature} last />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .flotte-grid {
            grid-template-columns: 1fr !important;
          }
          .flotte-item {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .flotte-item:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  )
}
