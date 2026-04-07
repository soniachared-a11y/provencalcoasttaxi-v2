import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AirplaneTilt, Briefcase, Wine, MapPin, Compass,
  ArrowRight, CheckCircle, Clock, X,
} from '@phosphor-icons/react'
import { SERVICES, CONTACT } from '../data/content'
import CharReveal from '../components/ui/CharReveal'
import SEOHead from '../seo/SEOHead'

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
  '/images/Chauffeur-mariage-taxi-a-auxerre.webp',
  '/images/van-provence.jpg',
  '/images/lavande-soleil.jpg',
]

const GRID_ITEMS = [
  { idx: 0, span: 1 },
  { idx: 1, span: 1 },
  { idx: 2, span: 1 },
  { idx: 3, span: 2 },
  { idx: 4, span: 1 },
]

const ACCENT_COLORS = ['var(--olive)', 'var(--lavande)', 'var(--olive)', 'var(--lavande)', 'var(--olive)']

function ServiceCard({ serviceIdx, span, openIdx, onOpen, onClose }) {
  const service = SERVICES[serviceIdx]
  const Icon = ICON_MAP[service.icon]
  const imgRef = useRef(null)
  const panelRef = useRef(null)
  const cardRef = useRef(null)
  const isOpen = openIdx === serviceIdx
  const num = String(serviceIdx + 1).padStart(2, '0')
  const accent = ACCENT_COLORS[serviceIdx]

  // Animate panel open/close
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    if (isOpen) {
      gsap.set(panel, { display: 'flex', clipPath: 'inset(100% 0 0 0)' })
      gsap.to(panel, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.55,
        ease: 'power3.out',
      })
      gsap.from(panel.querySelectorAll('.panel-item'), {
        y: 14,
        opacity: 0,
        stagger: 0.06,
        duration: 0.4,
        delay: 0.15,
        ease: 'power2.out',
      })
      // Scroll vers le haut de la carte via Lenis (compatibilité smooth scroll)
      // On le fait immédiatement, avant que l'animation parte
      const card = cardRef.current
      if (card) {
        const rect = card.getBoundingClientRect()
        // Ne scroll que si la carte n'est pas déjà bien visible en haut
        if (rect.top > window.innerHeight * 0.35 || rect.top < 0) {
          if (window.__lenis) {
            window.__lenis.scrollTo(card, { duration: 0.7, offset: -90 })
          } else {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    } else {
      gsap.to(panel, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => gsap.set(panel, { display: 'none' }),
      })
    }
  }, [isOpen])

  const handleCardClick = useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      onOpen(serviceIdx)
      if (imgRef.current) gsap.to(imgRef.current, { scale: 1.05, filter: 'saturate(1)', duration: 0.6, ease: 'power2.out' })
    }
  }, [isOpen, serviceIdx, onOpen, onClose])

  const handleMouseEnter = () => {
    if (isOpen) return
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.07, filter: 'saturate(1.05)', duration: 0.55, ease: 'power2.out' })
  }
  const handleMouseLeave = () => {
    if (isOpen) return
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.03, filter: 'saturate(0.75)', duration: 0.55, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="svc-card"
      data-open={isOpen}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        gridColumn: span === 2 ? 'span 2' : 'span 1',
        height: '50vh',
        minHeight: 320,
        cursor: 'pointer',
        borderRadius: 3,
      }}
    >
      {/* Background image */}
      <img
        ref={imgRef}
        src={SERVICE_IMAGES[serviceIdx]}
        alt={service.titre}
        width={1200}
        height={800}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.03)',
          filter: 'saturate(0.75)',
          willChange: 'transform, filter',
        }}
      />

      {/* Base overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isOpen ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.38)',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* TOP LEFT — number + label + underline */}
      <div style={{
        position: 'absolute',
        top: 28,
        left: 28,
        right: 28,
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.2em', color: accent, flexShrink: 0,
          }}>
            {num}
          </span>
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)', flexShrink: 0,
          }}>
            {service.titre}
          </span>
        </div>
        <div style={{
          height: 1,
          background: isOpen
            ? `linear-gradient(to right, ${accent} 0%, transparent 100%)`
            : 'linear-gradient(to right, rgba(255,255,255,0.25) 0%, transparent 100%)',
          transition: 'background 0.4s ease',
          width: '100%',
        }} />
      </div>

      {/* Close button — visible when open */}
      {isOpen && (
        <button
          onClick={e => { e.stopPropagation(); onClose() }}
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            backdropFilter: 'blur(4px)',
          }}
        >
          <X size={12} weight="bold" />
        </button>
      )}

      {/* BOTTOM — title + price (always visible) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: span === 2 ? '0 36px 32px' : '0 28px 28px',
        pointerEvents: 'none',
      }}>
        {Icon && (
          <div style={{ marginBottom: 8 }}>
            <Icon size={span === 2 ? 20 : 17} weight="duotone" style={{ color: accent }} />
          </div>
        )}
        <h2 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: span === 2 ? 'clamp(22px, 2.8vw, 36px)' : 'clamp(18px, 2vw, 26px)',
          fontWeight: 400, color: '#fff', margin: '0 0 8px', lineHeight: 1.15,
        }}>
          {service.titre}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: span === 2 ? 16 : 13,
            fontStyle: 'italic', color: accent,
          }}>
            {service.prix}
          </span>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#fff',
            background: isOpen ? accent : 'transparent',
            border: isOpen ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.25)',
            transition: 'background 0.3s, border-color 0.3s',
          }}>
            <ArrowRight
              size={12}
              weight="bold"
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* EXPAND PANEL — slides up from bottom on click */}
      <div
        ref={panelRef}
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,12,18,0.97) 0%, rgba(10,12,18,0.92) 100%)',
          backdropFilter: 'blur(8px)',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          padding: span === 2 ? '64px 36px 32px' : '56px 24px 24px',
          clipPath: 'inset(100% 0 0 0)',
          willChange: 'clip-path',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Icon + title */}
        <div className="panel-item" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          {Icon && <Icon size={20} weight="duotone" style={{ color: accent, flexShrink: 0 }} />}
          <h3 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: span === 2 ? 28 : 22,
            fontWeight: 400, color: '#fff', margin: 0, lineHeight: 1.15,
          }}>
            {service.titre}
          </h3>
        </div>

        {/* Description */}
        <p className="panel-item" style={{
          fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 300,
          color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
          marginBottom: 18, maxWidth: 520,
        }}>
          {service.desc}
        </p>

        {/* Tags */}
        <div className="panel-item" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
          {service.tags.map((tag, j) => (
            <span key={j} style={{
              fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: '4px 10px', borderRadius: 2,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="panel-item" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 17,
            fontStyle: 'italic', color: accent,
          }}>
            {service.prix}
          </span>
          <Link
            to="/contact"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              backgroundColor: accent, color: '#fff',
              padding: '11px 24px',
              fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 2,
              transition: 'background-color 0.3s, gap 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.gap = '14px' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.gap = '10px' }}
          >
            Réserver ce service
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const pageRef = useRef(null)
  const gridRef = useRef(null)
  const [openIdx, setOpenIdx] = useState(null)

  const handleOpen = useCallback((idx) => setOpenIdx(idx), [])
  const handleClose = useCallback(() => setOpenIdx(null), [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenIdx(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-hero-text > *', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.svc-card', {
        y: 50, opacity: 0, duration: 0.9,
        stagger: { each: 0.09, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current, start: 'top 82%', once: true,
        },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} style={{ background: '#0D1117', minHeight: '100vh', paddingTop: 72 }}>
      <SEOHead
        path="/services"
        title="Transfert aéroport Marseille, taxi gare TGV Aix, VTC Provence — Taxis Provençale Aix"
        description="Transfert aéroport Marseille-Provence Marignane, navette gare TGV Aix, taxi Luberon Gordes, déplacements affaires, mariage et événements, longue distance Nice Monaco Cannes. Mercedes avec chauffeur, tarif fixe. ☎ 06 15 96 32 75."
      />

      {/* Hero */}
      <div className="svc-hero-text" style={{
        maxWidth: 1200, margin: '0 auto', padding: '56px 40px 48px',
      }}>
        <span style={{
          fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--lavande)', display: 'block', marginBottom: 20,
        }}>
          Nos services
        </span>
        <CharReveal
          text="Une offre complète"
          as="h1"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400, color: '#fff', lineHeight: 1.1, margin: '0 0 24px',
          }}
        />
        <p style={{
          fontFamily: 'Sora, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.8, maxWidth: 520, margin: 0,
        }}>
          Du transfert aéroport au circuit touristique, chaque trajet est pensé pour
          offrir confort, ponctualité et un service irréprochable.
        </p>
      </div>

      {/* Grid 3×2 */}
      <div
        ref={gridRef}
        className="svc-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          margin: '0 40px 80px',
        }}
      >
        {GRID_ITEMS.map((item, i) => (
          <ServiceCard
            key={item.idx}
            serviceIdx={item.idx}
            span={item.span}
            openIdx={openIdx}
            onOpen={handleOpen}
            onClose={handleClose}
          />
        ))}
      </div>

      {/* Bottom trust bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '48px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 24, maxWidth: 1200, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { icon: CheckCircle, label: 'Tarif fixe garanti', color: 'var(--olive)' },
            { icon: Clock, label: 'Disponible 24h/24', color: 'var(--lavande)' },
            { icon: AirplaneTilt, label: 'Suivi des vols en temps réel', color: 'var(--olive)' },
          ].map(({ icon: Icon, label, color }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon size={18} weight="duotone" style={{ color }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <a
          href={CONTACT.telHref}
          style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 18,
            color: '#fff', textDecoration: 'none', transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--lavande)'}
          onMouseLeave={e => e.currentTarget.style.color = '#fff'}
        >
          {CONTACT.tel}
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; margin: 0 20px 60px !important; }
          .svc-card { height: 42vh !important; }
          .svc-card[data-open="true"] { height: auto !important; min-height: 480px !important; }
        }
        @media (max-width: 600px) {
          .svc-grid { grid-template-columns: 1fr !important; margin: 0 16px 56px !important; }
          .svc-card { height: 56vw !important; min-height: 240px !important; grid-column: span 1 !important; }
          .svc-card[data-open="true"] { height: auto !important; min-height: 420px !important; }
        }
      `}</style>
    </main>
  )
}
