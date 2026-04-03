import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AirplaneTilt, Briefcase, Wine, MapPin, Compass,
  ArrowRight, CheckCircle, Clock, CurrencyEur,
} from '@phosphor-icons/react'
import { SERVICES, CONTACT } from '../data/content'
import CharReveal from '../components/ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

const ICON_MAP = {
  Plane: AirplaneTilt,
  Briefcase: Briefcase,
  Wine: Wine,
  MapPin: MapPin,
  Compass: Compass,
}

const SERVICE_IMAGES = [
  '/images/flotte-intercontinental.jpeg',
  '/images/classe-s-interieur.jpg',
  '/images/flotte-chateau.jpeg',
  '/images/classe-s-bastide.jpg',
  '/images/lavande-provence.jpg',
]

const ACTIVE_W = 52  // % for active panel
const INACTIVE_W = (100 - ACTIVE_W) / (SERVICES.length - 1)

export default function ServicesPage() {
  const [active, setActive] = useState(0)
  const panelsRef = useRef([])
  const pageRef = useRef(null)
  const isAnimating = useRef(false)

  // Initial entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-hero-text > *', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2,
      })
      gsap.from(panelsRef.current, {
        y: 60, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.5,
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // Panel width animation on active change
  useEffect(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    panelsRef.current.forEach((panel, i) => {
      if (!panel) return
      const isActive = i === active

      gsap.to(panel, {
        width: `${isActive ? ACTIVE_W : INACTIVE_W}%`,
        duration: 0.75,
        ease: 'power3.inOut',
        onComplete: () => { if (i === active) isAnimating.current = false },
      })

      const expanded = panel.querySelector('.svc-expanded')
      const collapsed = panel.querySelector('.svc-collapsed')
      const img = panel.querySelector('.svc-img')

      if (expanded) gsap.to(expanded, {
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : -20,
        duration: isActive ? 0.5 : 0.2,
        delay: isActive ? 0.35 : 0,
        ease: 'power2.out',
      })

      if (collapsed) gsap.to(collapsed, {
        opacity: isActive ? 0 : 1,
        duration: 0.3,
        delay: isActive ? 0 : 0.2,
      })

      if (img) gsap.to(img, {
        scale: isActive ? 1.05 : 1,
        duration: 0.75,
        ease: 'power2.inOut',
      })
    })
  }, [active])

  return (
    <main ref={pageRef} style={{ background: '#0D1117', minHeight: '100vh', paddingTop: 72 }}>

      {/* Hero header */}
      <div className="svc-hero-text" style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '56px 40px 48px',
      }}>
        <span style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--lavande)',
          display: 'block',
          marginBottom: 20,
        }}>
          Nos services
        </span>
        <CharReveal
          text="Une offre complète"
          as="h1"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.1,
            margin: '0 0 24px',
          }}
        />
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 15,
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.8,
          maxWidth: 520,
          margin: 0,
        }}>
          Du transfert aéroport au circuit touristique, chaque trajet est pensé pour
          offrir confort, ponctualité et un service irréprochable.
        </p>
      </div>

      {/* Accordion horizontal */}
      <div style={{
        display: 'flex',
        height: 'clamp(520px, 72vh, 780px)',
        overflow: 'hidden',
        margin: '0 40px 80px',
        borderRadius: 4,
        gap: 3,
      }}>
        {SERVICES.map((service, i) => {
          const Icon = ICON_MAP[service.icon]
          const isActive = i === active

          return (
            <div
              key={i}
              ref={el => panelsRef.current[i] = el}
              onClick={() => !isActive && setActive(i)}
              style={{
                width: `${i === 0 ? ACTIVE_W : INACTIVE_W}%`,
                position: 'relative',
                overflow: 'hidden',
                cursor: isActive ? 'default' : 'pointer',
                flexShrink: 0,
                borderRadius: 4,
              }}
              onMouseEnter={e => {
                if (isActive) return
                const img = e.currentTarget.querySelector('.svc-img')
                if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' })
              }}
              onMouseLeave={e => {
                if (isActive) return
                const img = e.currentTarget.querySelector('.svc-img')
                if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' })
              }}
            >
              {/* Background image */}
              <img
                src={SERVICE_IMAGES[i]}
                alt={service.titre}
                className="svc-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transformOrigin: 'center center',
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isActive
                  ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 100%)',
                transition: 'background 0.5s ease',
              }} />

              {/* Panel number — top left */}
              <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Accent line top */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: 'var(--lavande)',
                }} />
              )}

              {/* Collapsed state — vertical title */}
              <div
                className="svc-collapsed"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: i === 0 ? 0 : 1,
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  transform: 'rotate(-90deg)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  {Icon && <Icon size={18} weight="duotone" style={{ color: 'var(--lavande)', transform: 'rotate(90deg)' }} />}
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)',
                  }}>
                    {service.titre}
                  </span>
                </div>
              </div>

              {/* Expanded state */}
              <div
                className="svc-expanded"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0 40px 44px',
                  opacity: i === 0 ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Icon + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  {Icon && <Icon size={26} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0 }} />}
                  <h2 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 400,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.2,
                  }}>
                    {service.titre}
                  </h2>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.75,
                  marginBottom: 24,
                  maxWidth: 440,
                }}>
                  {service.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {service.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '5px 12px',
                      borderRadius: 2,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price + CTA row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 20,
                    color: 'var(--lavande)',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 4,
                  }}>
                    <CurrencyEur size={16} weight="bold" style={{ verticalAlign: 'middle', marginBottom: 2 }} />
                    <span>{service.prix.replace('€', '').replace('dès ', '')}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Sora, sans-serif' }}>
                      {service.prix.startsWith('dès') ? '— tarif indicatif' : ''}
                    </span>
                  </div>

                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      backgroundColor: 'var(--olive)',
                      color: '#fff',
                      padding: '13px 28px',
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderRadius: 2,
                      transition: 'background-color 0.3s, gap 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5A6B3A'; e.currentTarget.style.gap = '14px' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--olive)'; e.currentTarget.style.gap = '10px' }}
                  >
                    Réserver ce service
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA strip */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '48px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 24,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { icon: CheckCircle, label: 'Tarif fixe garanti' },
            { icon: Clock, label: 'Disponible 24h/24' },
            { icon: AirplaneTilt, label: 'Suivi des vols en temps réel' },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon size={18} weight="duotone" style={{ color: 'var(--lavande)' }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <a
          href={CONTACT.telHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 18,
            color: '#fff',
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--lavande)'}
          onMouseLeave={e => e.currentTarget.style.color = '#fff'}
        >
          {CONTACT.tel}
        </a>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .svc-accordion { flex-direction: column !important; height: auto !important; margin: 0 16px 60px !important; }
          .svc-accordion > div { width: 100% !important; height: 220px; }
          .svc-accordion > div.active { height: 480px !important; }
        }
      `}</style>
    </main>
  )
}
