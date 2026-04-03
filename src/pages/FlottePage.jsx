import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AirplaneTakeoff, UsersThree, Bag,
  WifiHigh, Star, ArrowRight, CheckCircle,
  CarProfile, Seatbelt, Gauge,
} from '@phosphor-icons/react'
import { FLOTTE, CONTACT } from '../data/content'
import CharReveal from '../components/ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

// ── Tarif rapide (même logique que DevisSimulateur)
const TARIF_JOUR = 2.22
const TARIF_NUIT = 2.88
const PRISE_EN_CHARGE = 4.00
const MINIMUM = 12

const DEST_RAPIDES = [
  { label: 'Aéroport Marseille', km: 42 },
  { label: 'Gare TGV Aix', km: 12 },
  { label: 'Aéroport Nice', km: 180 },
  { label: 'Cassis / Calanques', km: 50 },
  { label: 'Gordes / Luberon', km: 65 },
  { label: 'Marseille Centre', km: 35 },
  { label: 'Avignon', km: 85 },
  { label: 'Monaco', km: 210 },
]

// Icônes par véhicule
const FLOTTE_EXTRAS = [
  {
    icon: CarProfile,
    color: 'var(--bleu)',
    tags: ['Wi-Fi à bord', 'Climatisation bi-zone', '3 passagers max'],
    detailImg: '/images/classe-s-interieur.jpg',
    cutout: '/images/classe-s-detour.png',
    bgImg: '/images/classe-e-provence.jpg',
    accentColor: 'var(--bleu)',
    bgAccent: '#3D5A8015',
  },
  {
    icon: Star,
    color: 'var(--lavande)',
    tags: ['Sièges massants', 'Isolation phonique', 'Service VIP'],
    detailImg: '/images/classe-s-interieur.jpg',
    cutout: '/images/classe-s-detour.png',
    bgImg: '/images/classe-s-provence.jpg',
    accentColor: 'var(--lavande)',
    bgAccent: '#7A609115',
  },
  {
    icon: UsersThree,
    color: 'var(--olive)',
    tags: ['7 passagers', 'Grand espace bagages', 'Transferts groupe'],
    detailImg: '/images/classe-v-interieur.jpg',
    cutout: '/images/classe-v-detour.png',
    bgImg: '/images/classe-v-provence.jpg',
    accentColor: 'var(--olive)',
    bgAccent: '#6B7D4A15',
  },
]

function QuickEstimator({ vehicleIndex }) {
  const [dest, setDest] = useState('')
  const [heure, setHeure] = useState('')
  const [result, setResult] = useState(null)
  const destObj = DEST_RAPIDES.find(d => d.label === dest)

  function calc() {
    if (!destObj) return
    const h = heure ? parseInt(heure.split(':')[0], 10) : 10
    const tarif = h >= 7 && h < 19 ? TARIF_JOUR : TARIF_NUIT
    const prix = Math.max(MINIMUM, +(PRISE_EN_CHARGE + destObj.km * tarif).toFixed(2))
    setResult({ prix, isNuit: tarif === TARIF_NUIT, km: destObj.km })
  }

  const iStyle = {
    background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    color: '#fff', fontFamily: 'Sora, sans-serif', fontSize: 13,
    padding: '10px 0', width: '100%', outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <div style={{
      background: 'rgba(0,0,0,0.35)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '28px 24px',
      marginTop: 32,
    }}>
      <div style={{ fontFamily: 'Sora', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
        Estimer mon trajet
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
        <select
          value={dest}
          onChange={e => { setDest(e.target.value); setResult(null) }}
          style={{ ...iStyle, cursor: 'pointer', appearance: 'none' }}
          onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
          onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
        >
          <option value="" style={{ background: '#111' }}>Destination</option>
          {DEST_RAPIDES.map((d, i) => (
            <option key={i} value={d.label} style={{ background: '#111' }}>{d.label}</option>
          ))}
        </select>
        <input
          type="time"
          value={heure}
          onChange={e => { setHeure(e.target.value); setResult(null) }}
          style={{ ...iStyle, colorScheme: 'dark' }}
          onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
          onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
        />
      </div>
      {result && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', marginBottom: 12, borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <div style={{ fontFamily: 'Sora', fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{result.km} km</div>
          </div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: 'var(--olive)', flex: 1 }}>~{result.prix}€</div>
          <div style={{ fontFamily: 'Sora', fontSize: 10, color: result.isNuit ? '#F6AD55' : 'rgba(255,255,255,0.4)' }}>
            {result.isNuit ? '🌙 Nuit' : '☀️ Jour'}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button
          onClick={calc}
          disabled={!destObj}
          style={{
            flex: 1, background: destObj ? 'var(--olive)' : 'rgba(255,255,255,0.08)',
            color: destObj ? '#fff' : 'rgba(255,255,255,0.3)',
            border: 'none', fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '12px 0', cursor: destObj ? 'pointer' : 'not-allowed',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => { if (destObj) e.currentTarget.style.background = '#5A6B3A' }}
          onMouseLeave={e => { if (destObj) e.currentTarget.style.background = 'var(--olive)' }}
        >
          Calculer
        </button>
        <Link
          to="/contact"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontFamily: 'Sora', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '12px 0', textDecoration: 'none',
            transition: 'border-color 0.3s, background 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          Réserver <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

function VehicleSection({ v, extra, index }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const [tab, setTab] = useState('specs')
  const isReversed = index % 2 !== 0
  const Icon = extra.icon

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Content reveal
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('.reveal-item'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            once: true,
          },
        })
      }

      // Image clip reveal
      gsap.from(`.vehicle-img-wrap-${index}`, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [index])

  return (
    <section
      ref={sectionRef}
      id={`vehicule-${v.modele.toLowerCase().replace(/\s+/g, '-')}`}
      style={{
        background: index % 2 === 0 ? 'var(--surface)' : 'var(--surface-alt)',
        borderTop: v.phare ? `2px solid ${extra.accentColor}` : 'none',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isReversed ? '1fr 1fr' : '1fr 1fr',
        maxWidth: 1200,
        margin: '0 auto',
        minHeight: 560,
      }}
        className="vehicle-grid"
      >
        {/* IMAGE PANEL */}
        <div
          style={{
            order: isReversed ? 2 : 1,
            position: 'relative',
            overflow: 'hidden',
            background: '#0D1117',
            minHeight: 480,
          }}
          className={`vehicle-img-wrap-${index}`}
        >
          {/* Atmosphere bg */}
          <img
            ref={imageRef}
            src={extra.bgImg}
            alt={v.modele}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '115%',
              objectFit: 'cover',
              opacity: 0.25,
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isReversed
              ? 'linear-gradient(to right, #0D1117 0%, transparent 60%)'
              : 'linear-gradient(to left, #0D1117 0%, transparent 60%)',
          }} />

          {/* Vehicle cutout */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 32px',
          }}>
            <img
              src={extra.cutout}
              alt={`${v.modele} profil`}
              style={{
                maxWidth: '100%',
                maxHeight: 220,
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
                mixBlendMode: 'luminosity',
                opacity: 0.9,
              }}
            />
          </div>

          {/* Badge */}
          <div style={{
            position: 'absolute',
            top: 28,
            left: 28,
            background: extra.accentColor,
            color: '#fff',
            fontFamily: 'Sora',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '6px 14px',
          }}>
            {v.badge}
          </div>

          {/* Phare badge */}
          {v.phare && (
            <div style={{
              position: 'absolute',
              top: 28,
              right: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Sora',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              <Star size={12} weight="fill" style={{ color: extra.accentColor }} />
              Recommandé
            </div>
          )}

          {/* Quick interior toggle */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            overflow: 'hidden',
          }}>
            <img
              src={extra.detailImg}
              alt={`Intérieur ${v.modele}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.3,
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #0D1117 0%, transparent 100%)',
            }} />
          </div>
        </div>

        {/* CONTENT PANEL */}
        <div
          ref={contentRef}
          style={{
            order: isReversed ? 1 : 2,
            padding: 'clamp(40px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Eyebrow */}
          <div className="reveal-item" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}>
            <Icon size={16} weight="duotone" style={{ color: extra.accentColor }} />
            <span style={{
              fontFamily: 'Sora',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: extra.accentColor,
            }}>
              {v.classe}
            </span>
          </div>

          {/* Titre */}
          <div className="reveal-item">
            <CharReveal
              text={v.modele}
              as="h2"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 400,
                color: 'var(--texte)',
                lineHeight: 1.1,
                margin: '0 0 20px',
              }}
            />
          </div>

          {/* Description */}
          <p className="reveal-item" style={{
            fontFamily: 'Sora',
            fontSize: 13,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            margin: '0 0 28px',
            maxWidth: 400,
          }}>
            {v.desc}
          </p>

          {/* Tabs specs / équipement */}
          <div className="reveal-item" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 20, gap: 0 }}>
              {['specs', 'équipement'].map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    fontFamily: 'Sora',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: tab === t ? extra.accentColor : 'var(--texte-faint)',
                    background: 'none',
                    border: 'none',
                    borderBottom: tab === t ? `2px solid ${extra.accentColor}` : '2px solid transparent',
                    padding: '0 0 12px',
                    marginRight: 24,
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    marginBottom: -1,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { icon: UsersThree, label: 'Passagers', value: `${v.pax} max` },
                  { icon: Bag, label: 'Bagages', value: `${v.bags} pièces` },
                  { icon: Gauge, label: v.featureLabel, value: v.feature },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: '16px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    textAlign: 'center',
                  }}>
                    <s.icon size={20} weight="duotone" style={{ color: extra.accentColor, marginBottom: 8 }} />
                    <div style={{ fontFamily: 'Sora', fontSize: 9, color: 'var(--texte-faint)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, color: 'var(--texte)', fontWeight: 400 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'équipement' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Climatisation bi-zone automatique',
                  'Wi-Fi haut débit à bord',
                  'Chargeurs USB-C & USB-A',
                  'Sièges en cuir pleine fleur',
                  'Vitres surteintées',
                  v.feature,
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} weight="duotone" style={{ color: extra.accentColor, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)' }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="reveal-item" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {extra.tags.map((tag, i) => (
              <span key={i} style={{
                fontFamily: 'Sora',
                fontSize: 10,
                fontWeight: 500,
                color: extra.accentColor,
                border: `1px solid ${extra.accentColor}30`,
                background: `${extra.accentColor}08`,
                padding: '5px 12px',
                letterSpacing: '0.05em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Quick estimator */}
          <div className="reveal-item">
            <QuickEstimator vehicleIndex={index} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vehicle-grid {
            grid-template-columns: 1fr !important;
          }
          .vehicle-grid > div:first-child,
          .vehicle-grid > div:last-child {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  )
}

export default function FlottePage() {
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroTitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Hero title fade on scroll
      if (heroTitleRef.current) {
        gsap.to(heroTitleRef.current, {
          yPercent: 60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1,
          },
        })
      }

      // Hero content stagger in
      gsap.from('.hero-flotte-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="page-hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: 600,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background image parallax */}
        <img
          ref={heroBgRef}
          src="/images/flotte-intercontinental.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-10% 0',
            width: '100%',
            height: '120%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.6) 50%, rgba(13,17,23,0.8) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)',
        }} />

        {/* Content */}
        <div
          ref={heroTitleRef}
          className="hero-flotte-content"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: 900,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 24,
          }}>
            <div style={{ height: 1, width: 40, background: 'var(--lavande)' }} />
            <span style={{
              fontFamily: 'Sora',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--lavande)',
            }}>
              Notre Flotte
            </span>
            <div style={{ height: 1, width: 40, background: 'var(--lavande)' }} />
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.05,
            margin: '0 0 24px',
            letterSpacing: '-0.01em',
          }}>
            Trois Mercedes.
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>Un seul standard.</span>
          </h1>

          <p style={{
            fontFamily: 'Sora',
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto 40px',
          }}>
            Chaque véhicule est entretenu quotidiennement et équipé pour votre confort absolu.
            Cuir intégral, Wi-Fi, climatisation bi-zone — l'excellence à chaque trajet.
          </p>

          {/* Quick nav to vehicles */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
            {FLOTTE.map((v, i) => (
              <a
                key={i}
                href={`#vehicule-${v.modele.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  fontFamily: 'Sora',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '10px 20px',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {v.modele}
                {v.phare && <Star size={10} weight="fill" style={{ color: 'var(--lavande)' }} />}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(255,255,255,0.35)',
          zIndex: 2,
        }}
          className="scroll-indicator"
        >
          <span style={{ fontFamily: 'Sora', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Défiler</span>
          <div style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, transparent 100%)',
          }} />
        </div>
      </section>

      {/* ── STATS RAPIDES ────────────────────────────────────── */}
      <section style={{ background: 'var(--texte)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, textAlign: 'center' }}>
          {[
            { v: '3', l: 'Véhicules Mercedes' },
            { v: '100%', l: 'Entretien quotidien' },
            { v: '15 000+', l: 'Trajets réalisés' },
            { v: '4.9★', l: 'Note Google' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '20px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#fff', marginBottom: 4 }}>{s.v}</div>
              <div style={{ fontFamily: 'Sora', fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VEHICLE SECTIONS ─────────────────────────────────── */}
      {FLOTTE.map((v, i) => (
        <VehicleSection key={i} v={v} extra={FLOTTE_EXTRAS[i]} index={i} />
      ))}

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section style={{
        background: 'var(--olive)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/lavande-provence.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.15, mixBlendMode: 'multiply',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 16,
          }}>
            Prêt à partir ?
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400, color: '#fff', margin: '0 0 16px',
          }}>
            Réservez votre Mercedes maintenant
          </h2>
          <p style={{ fontFamily: 'Sora', fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 auto 36px', maxWidth: 400, lineHeight: 1.7 }}>
            Tarif fixe garanti, confirmation en 15 minutes, disponible 24h/24.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              background: '#fff', color: 'var(--olive)',
              fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '16px 36px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Réserver maintenant <ArrowRight size={14} />
            </Link>
            <a href={CONTACT.telHref} style={{
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              fontFamily: 'Sora', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em',
              padding: '16px 36px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
            >
              <AirplaneTakeoff size={14} weight="duotone" />
              {CONTACT.tel}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
