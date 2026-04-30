import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AirplaneTakeoff, Star, ArrowRight, CheckCircle,
} from '@phosphor-icons/react'
import { FLOTTE, CONTACT } from '../data/content'
import CharReveal from '../components/ui/CharReveal'
import SEOHead from '../seo/SEOHead'
import AddressAutocomplete from '../components/ui/AddressAutocomplete'
import { priceFor } from '../lib/pricing'

gsap.registerPlugin(ScrollTrigger)

// Mapping fleet → tier tarifaire (3 cards : E, S, V → berline, berline, van)
const FLEET_TIERS = ['berline', 'berline', 'van']

const FLOTTE_EXTRAS = [
  {
    accentColor: 'var(--lavande)',
    bgImg: '/images/classe-e-provence.jpg',
    cutout: '/images/classe-s-detour.png',
    detailImg: '/images/classe-s-interieur.jpg',
    equipment: [
      'Climatisation bi-zone automatique',
      'Wi-Fi haut débit à bord',
      'Chargeurs USB-C & USB-A',
      'Sièges cuir pleine fleur',
      'Vitres surteintées',
    ],
  },
  {
    accentColor: 'var(--olive)',
    bgImg: '/images/classe-s-provence.jpg',
    cutout: '/images/classe-s-detour.png',
    detailImg: '/images/classe-s-interieur.jpg',
    equipment: [
      'Sièges massants électriques',
      'Suspension pneumatique',
      'Isolation phonique totale',
      'Écrans arrière intégrés',
      'Service boissons inclus',
    ],
  },
  {
    accentColor: '#7EC8C8',
    bgImg: '/images/classe-v-provence.jpg',
    cutout: '/images/classe-v-detour.png',
    detailImg: '/images/classe-v-interieur.jpg',
    equipment: [
      '7 sièges configuration modulable',
      'Coffre XXL pour groupes',
      'Tables de travail escamotables',
      'Wi-Fi & USB multi-ports',
      'Transferts famille / groupe',
    ],
  },
]

function CompactEstimator({ accent, tierId = 'berline' }) {
  const [dest, setDest] = useState(null)   // { label, km } | null
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function calc() {
    if (!dest?.km) return
    const h = new Date().getHours()
    const prix = priceFor(tierId, dest.km, h)
    setResult({ prix, km: dest.km })
  }

  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      paddingTop: 20,
      marginTop: 20,
    }}>
      <div style={{ fontFamily: 'Sora', fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
        Estimer ce trajet
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <AddressAutocomplete
            value={dest}
            onChange={d => { setDest(d); setResult(null) }}
            placeholder="Destination…"
            dark={true}
            onLoadingChange={setLoading}
            inputStyle={{ height: 38, fontSize: 11, border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
        <button
          onClick={calc}
          disabled={!dest?.km || loading}
          style={{
            background: (dest?.km && !loading) ? accent : 'rgba(255,255,255,0.05)',
            color: (dest?.km && !loading) ? '#fff' : 'rgba(255,255,255,0.2)',
            border: 'none', fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '9px 14px', cursor: (dest?.km && !loading) ? 'pointer' : 'not-allowed',
            transition: 'background 0.3s', whiteSpace: 'nowrap', height: 38, flexShrink: 0,
          }}
        >
          {loading ? '…' : 'Calculer'}
        </button>
      </div>
      {dest?.km && !result && (
        <div style={{ fontFamily: 'Sora', fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
          {dest.km} km depuis Aix-en-Provence
        </div>
      )}
      {result && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${accent}30`,
          padding: '10px 14px',
        }}>
          <span style={{ fontFamily: 'Sora', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
            {result.km} km
          </span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: accent }}>
            {result.prix}€
          </span>
          <Link to="/contact" style={{
            fontFamily: 'Sora', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 4, opacity: 0.7,
          }}>
            Réserver <ArrowRight size={10} />
          </Link>
        </div>
      )}
    </div>
  )
}

function VehicleSection({ v, extra, index }) {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const numRef = useRef(null)
  const panelRef = useRef(null)
  const num = String(index + 1).padStart(2, '0')
  const { accentColor } = extra

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      })

      // Giant number clip reveal
      gsap.from(numRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      // Panel slide in
      gsap.from(panelRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })

      // Content stagger
      gsap.from(sectionRef.current.querySelectorAll('.vc-item'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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
        position: 'relative',
        background: '#0D1117',
        overflow: 'hidden',
        borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Background atmosphere image */}
      <img
        ref={bgRef}
        src={extra.bgImg}
        alt=""
        aria-hidden="true"
        width={1200}
        height={800}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: '-18% 0',
          width: '100%',
          height: '136%',
          objectFit: 'cover',
          opacity: 0.18,
          filter: 'saturate(0.6)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, rgba(13,17,23,0.97) 30%, rgba(13,17,23,0.55) 65%, rgba(13,17,23,0.92) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Giant decorative number */}
      <div
        ref={numRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '-2%',
          transform: 'translateY(-55%)',
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(200px, 28vw, 380px)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.028)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
          willChange: 'clip-path',
        }}
      >
        {num}
      </div>

      {/* Main content grid */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1300,
        margin: '0 auto',
        padding: 'clamp(48px, 8vh, 100px) clamp(16px, 4vw, 40px)',
        display: 'grid',
        gridTemplateColumns: '1fr clamp(300px, 30vw, 400px)',
        gap: 'clamp(40px, 5vw, 80px)',
        alignItems: 'center',
        minHeight: '85vh',
      }}
        className="flotte-grid"
      >
        {/* LEFT — editorial content */}
        <div>
          {/* Eyebrow */}
          <div className="vc-item" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <span style={{
              fontFamily: 'Sora',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: accentColor,
            }}>
              {num}
            </span>
            <div style={{ width: 32, height: 1, background: accentColor, opacity: 0.5 }} />
            <span style={{
              fontFamily: 'Sora',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}>
              {v.classe}
            </span>
            {v.phare && (
              <>
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                <span style={{
                  fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: accentColor,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Star size={8} weight="fill" style={{ color: accentColor }} />
                  Recommandé
                </span>
              </>
            )}
          </div>

          {/* Model name */}
          <div className="vc-item">
            <CharReveal
              text={v.modele}
              as="h2"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 1.05,
                margin: '0 0 6px',
                letterSpacing: '-0.02em',
              }}
            />
          </div>

          {/* Badge */}
          <div className="vc-item" style={{ marginBottom: 28 }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#fff',
              background: accentColor,
              padding: '5px 14px',
            }}>
              {v.badge}
            </span>
          </div>

          {/* Description */}
          <p className="vc-item" style={{
            fontFamily: 'Sora', fontSize: 13, fontWeight: 300,
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.85,
            maxWidth: 440, margin: '0 0 36px',
          }}>
            {v.desc}
          </p>

          {/* Capacity display — large numbers */}
          <div className="vc-item vc-capacity" style={{
            display: 'flex',
            gap: 0,
            marginBottom: 40,
            '--vc-accent': accentColor,
          }}>
            {[
              { val: v.pax, label: 'Passagers' },
              { val: v.bags, label: 'Bagages' },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '24px 36px',
                borderLeft: i === 0 ? `3px solid ${accentColor}` : '1px solid rgba(255,255,255,0.06)',
                borderRight: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 400,
                  color: accentColor,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {String(s.val).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
            <div style={{
              padding: '24px 36px',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
            }}>
              <div style={{
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                color: accentColor, letterSpacing: '0.1em',
                textAlign: 'center',
              }}>
                {v.feature}
              </div>
              <div style={{
                fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>
                {v.featureLabel}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="vc-item vc-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: accentColor, color: '#fff',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '14px 28px', textDecoration: 'none',
                transition: 'opacity 0.3s, gap 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.gap = '14px' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.gap = '10px' }}
            >
              Réserver ce véhicule
              <ArrowRight size={13} weight="bold" />
            </Link>
            <a
              href={CONTACT.telHref}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '14px 22px', textDecoration: 'none',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              {CONTACT.tel}
            </a>
          </div>
        </div>

        {/* RIGHT — glass panel */}
        <div
          ref={panelRef}
          className="flt-img-panel"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '36px 28px',
            borderTop: `2px solid ${accentColor}`,
          }}
        >
          {/* Vehicle cutout */}
          <div style={{
            position: 'relative',
            marginBottom: 28,
            minHeight: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={extra.cutout}
              alt={v.modele}
              width={600}
              height={400}
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: 150,
                objectFit: 'contain',
                filter: `drop-shadow(0 16px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 20px ${accentColor}20)`,
              }}
            />
          </div>

          {/* Thin divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

          {/* Equipment list */}
          <div style={{ marginBottom: 4 }}>
            <div style={{
              fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginBottom: 14,
            }}>
              Équipements
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {extra.equipment.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle
                    size={12}
                    weight="duotone"
                    style={{ color: accentColor, flexShrink: 0 }}
                  />
                  <span style={{
                    fontFamily: 'Sora', fontSize: 11, fontWeight: 300,
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compact estimator */}
          <CompactEstimator accent={accentColor} tierId={FLEET_TIERS[index] || 'berline'} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .flotte-grid {
            display: flex !important;
            flex-direction: column !important;
            min-height: auto !important;
            padding: 48px 20px !important;
            gap: 40px !important;
          }
          .flt-img-panel {
            order: -1 !important;
          }
        }
        @media (max-width: 600px) {
          .flotte-grid {
            padding: 40px 16px !important;
          }
          .vc-capacity {
            flex-direction: column !important;
          }
          .vc-capacity > div {
            border-left: none !important;
            border-right: none !important;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
            padding: 16px 20px !important;
          }
          .vc-capacity > div:first-child {
            border-top: none !important;
            border-left: 3px solid var(--vc-accent) !important;
          }
          .vc-ctas {
            flex-direction: column !important;
          }
          .vc-ctas a, .vc-ctas button {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </section>
  )
}

export default function FlottePage() {
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroContentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Hero content fade on scroll
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          yPercent: 40,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '55% top',
            scrub: 1,
          },
        })
      }

      // Hero entrance
      gsap.from('.hero-flotte-in', {
        y: 50, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.2,
      })

      // Stats counter
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseFloat(el.dataset.target)
        const isFloat = el.dataset.target.includes('.')
        gsap.from({ val: 0 }, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            el.textContent = isFloat
              ? this.targets()[0].val.toFixed(1) + (el.dataset.suffix || '')
              : Math.round(this.targets()[0].val) + (el.dataset.suffix || '')
          },
        })
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEOHead
        path="/flotte"
        title="Mercedes avec chauffeur Aix-en-Provence | Classe S, E, V 7 places — Taxis Provençale Aix"
        description="Flotte Mercedes haut de gamme à Aix-en-Provence : Classe E business, Classe S prestige sièges massants, Classe V van 7 places. Wi-Fi, climatisation, cuir. Transfert aéroport Marseille, gare TGV, Luberon. Tarif fixe. ☎ 06 15 96 32 75."
      />
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: 600,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D1117',
        }}
      >
        <img
          ref={heroBgRef}
          src="/images/flotte-hotel-luxe.jpg"
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          style={{
            position: 'absolute',
            inset: '-10% 0',
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            opacity: 0.35,
            filter: 'saturate(0.7)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.6) 50%, rgba(13,17,23,0.85) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to top, #0D1117 0%, transparent 100%)',
        }} />

        <div
          ref={heroContentRef}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(16px,4vw,24px)', maxWidth: 900, width: '100%' }}
        >
          <div className="hero-flotte-in" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginBottom: 28,
          }}>
            <div style={{ height: 1, width: 48, background: 'var(--lavande)', opacity: 0.6 }} />
            <span style={{
              fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--lavande)',
            }}>
              Notre Flotte
            </span>
            <div style={{ height: 1, width: 48, background: 'var(--lavande)', opacity: 0.6 }} />
          </div>

          <h1 className="hero-flotte-in" style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(44px, 7vw, 84px)',
            fontWeight: 400, color: '#fff', lineHeight: 1.05,
            margin: '0 0 20px', letterSpacing: '-0.02em',
          }}>
            Trois Mercedes.
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              Un seul standard.
            </span>
          </h1>

          <p className="hero-flotte-in" style={{
            fontFamily: 'Sora', fontSize: 14, color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8, maxWidth: 480, margin: '0 auto 40px',
          }}>
            Chaque véhicule est entretenu quotidiennement et équipé pour votre confort absolu.
          </p>

          <div className="hero-flotte-in" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
            {FLOTTE.map((v, i) => (
              <a
                key={i}
                href={`#vehicule-${v.modele.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '11px 22px', display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.3s',
                  background: v.phare ? 'rgba(107,125,74,0.15)' : 'transparent',
                  borderColor: v.phare ? 'var(--olive)' : 'rgba(255,255,255,0.15)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.background = v.phare ? 'rgba(107,125,74,0.15)' : 'transparent'
                  e.currentTarget.style.borderColor = v.phare ? 'var(--olive)' : 'rgba(255,255,255,0.15)'
                }}
              >
                {v.modele}
                {v.phare && <Star size={9} weight="fill" style={{ color: 'var(--olive)' }} />}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.2)', zIndex: 2,
        }}>
          <span style={{ fontFamily: 'Sora', fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Défiler
          </span>
          <div style={{
            width: 1, height: 44,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%)',
          }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <style>{`
          .stats-bar-grid { display: grid; grid-template-columns: repeat(4,1fr); text-align: center; }
          @media (max-width: 640px) {
            .stats-bar-grid { grid-template-columns: repeat(2,1fr) !important; }
            .stats-bar-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
            .stats-bar-grid > div:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.07) !important; }
            .stats-bar-grid > div:nth-last-child(-n+2) { border-bottom: none; }
          }
        `}</style>
        <div className="stats-bar-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {[
            { v: 3, suffix: '', l: 'Véhicules Mercedes' },
            { v: 100, suffix: '%', l: 'Entretien quotidien' },
            { v: 15000, suffix: '+', l: 'Trajets réalisés' },
            { v: 4.9, suffix: '★', l: 'Note Google' },
          ].map((s, i) => {
            const accent = i % 2 === 0 ? 'var(--olive)' : 'var(--lavande)'
            const accentRgb = i % 2 === 0 ? '107,125,74' : '122,96,145'
            return (
            <div key={i} style={{
              padding: '28px 16px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              position: 'relative',
            }}>
              {/* Bottom accent line */}
              <div style={{
                position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 1,
                background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.5), transparent)`,
              }} />
              <div
                className="stat-num"
                data-target={s.v}
                data-suffix={s.suffix}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  color: accent, marginBottom: 6,
                  textShadow: `0 0 24px rgba(${accentRgb},0.45)`,
                }}
              >
                {s.v}{s.suffix}
              </div>
              <div style={{
                fontFamily: 'Sora', fontSize: 9, fontWeight: 600,
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase', letterSpacing: '0.12em',
              }}>
                {s.l}
              </div>
            </div>
          )})}
        </div>
      </section>

      {/* ── VEHICLE SECTIONS ── */}
      {FLOTTE.map((v, i) => (
        <VehicleSection key={i} v={v} extra={FLOTTE_EXTRAS[i]} index={i} />
      ))}

      {/* ── BOTTOM CTA ── */}
      <section style={{
        background: '#0D1117',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(48px,8vw,80px) clamp(16px,4vw,24px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/lavande-soleil.jpg"
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.07, filter: 'saturate(0.3)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 20,
          }}>
            Prêt à partir ?
          </div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 400, color: '#fff', margin: '0 0 16px',
            letterSpacing: '-0.01em',
          }}>
            Réservez votre Mercedes maintenant
          </h2>
          <p style={{
            fontFamily: 'Sora', fontSize: 13, color: 'rgba(255,255,255,0.4)',
            margin: '0 auto 40px', maxWidth: 380, lineHeight: 1.8, fontWeight: 300,
          }}>
            Tarif fixe garanti, confirmation en 15 minutes, disponible 24h/24.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              background: 'var(--olive)', color: '#fff',
              fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '16px 36px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              transition: 'opacity 0.3s, gap 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.gap = '14px' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.gap = '10px' }}
            >
              Réserver maintenant <ArrowRight size={13} weight="bold" />
            </Link>
            <a href={CONTACT.telHref} style={{
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'Sora', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '16px 32px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'border-color 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
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
