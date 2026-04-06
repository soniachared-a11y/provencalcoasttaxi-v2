// FlotteVideo.jsx — Section vidéo plein écran + mini calculateur hero
// Véhicules détourés positionnés à CHEVAL entre cette section et la suivante

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Phone } from '@phosphor-icons/react'
import AddressAutocomplete from '../ui/AddressAutocomplete'
import { getRouteKmBetween, AIX } from '../../lib/geo'
import { CONTACT } from '../../data/content'

const TARIF_JOUR = 2.22
const TARIF_NUIT = 2.88
const PRISE = 4.00

gsap.registerPlugin(ScrollTrigger)

export default function FlotteVideo() {
  const sectionRef = useRef(null)
  const [depart, setDepart] = useState(null)
  const [arrivee, setArrivee] = useState(null)
  const [heure, setHeure] = useState('')
  const [calcLoading, setCalcLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function handleCalculer(e) {
    e.preventDefault()
    if (!arrivee) return
    setCalcLoading(true)
    setResult(null)

    let km = null
    const fromLat = depart?.lat ?? AIX.lat
    const fromLng = depart?.lng ?? AIX.lng

    if (arrivee.lat) {
      // Coordonnées disponibles (Photon ou destination rapide) — route exacte
      km = await getRouteKmBetween(fromLat, fromLng, arrivee.lat, arrivee.lng)
    } else if (arrivee.km) {
      // Fallback : km précalculé depuis Aix (départ Aix uniquement)
      km = arrivee.km
    }

    setCalcLoading(false)
    if (!km) return

    const h = heure ? parseInt(heure.split(':')[0], 10) : new Date().getHours()
    const tarif = h >= 7 && h < 19 ? TARIF_JOUR : TARIF_NUIT
    const prix = +(PRISE + km * tarif).toFixed(2)
    setResult({ km, prix, isNuit: tarif === TARIF_NUIT })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 70%', once: true }

      gsap.from('.fv-title', { opacity: 0, y: 50, duration: 1.1, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.fv-desc',  { opacity: 0, y: 30, duration: 0.9, delay: 0.18, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.fv-mini-form', { opacity: 0, y: 20, duration: 0.8, delay: 0.35, ease: 'power3.out', scrollTrigger: st })

      gsap.from('.fv-van', {
        y: 140, opacity: 0, duration: 1.4, delay: 0.2, ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.from('.fv-berline', {
        y: 120, opacity: 0, duration: 1.4, delay: 0.35, ease: 'power3.out',
        scrollTrigger: st,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="fv-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* overflow VISIBLE pour que les véhicules dépassent en bas */
        overflow: 'visible',
        zIndex: 2,
      }}
    >
      {/* Wrapper vidéo — overflow hidden ici pour contenir la vidéo */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/video-voiture.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay sombre */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        zIndex: 1,
      }} />

      {/* Contenu desktop — centré */}
      <div className="fv-content fv-content-desktop" style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        padding: '0 24px',
        marginBottom: 160,
      }}>
        <h2
          className="fv-title"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            fontWeight: 400,
            color: '#F6F3EE',
            lineHeight: 1.12,
            margin: '0 0 24px',
          }}
        >
          Votre chauffeur privé en Provence
        </h2>

        <p
          className="fv-desc"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 15,
            color: 'rgba(246,243,238,0.6)',
            lineHeight: 1.8,
            maxWidth: 480,
            margin: '0 auto 40px',
          }}
        >
          Berlines et vans Mercedes avec chauffeur, disponibles 24h/7j dans toute la Provence.
        </p>

        {/* Mini calculateur hero */}
        {!result ? (
          <form
            className="fv-btn fv-mini-form"
            onSubmit={handleCalculer}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: 0,
              background: 'rgba(246,243,238,0.07)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(246,243,238,0.15)',
              maxWidth: 780,
              margin: '0 auto',
              overflow: 'visible',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Départ */}
            <div style={{ flex: 1, position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)', minWidth: 0 }}>
              <label style={{
                position: 'absolute', top: 8, left: 38, zIndex: 2,
                fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--olive)', pointerEvents: 'none',
              }}>Départ</label>
              <AddressAutocomplete
                value={depart}
                onChange={d => { setDepart(d); setResult(null) }}
                placeholder="Aix-en-Provence (défaut)"
                isOrigin={true}
                dark={true}
                inputStyle={{
                  border: 'none', borderRadius: 0,
                  height: 64, paddingTop: 24, paddingBottom: 8,
                  background: 'transparent', color: '#F6F3EE',
                }}
              />
            </div>

            {/* Arrivée */}
            <div style={{ flex: 1, position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)', minWidth: 0 }}>
              <label style={{
                position: 'absolute', top: 8, left: 38, zIndex: 2,
                fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--olive)', pointerEvents: 'none',
              }}>Arrivée</label>
              <AddressAutocomplete
                value={arrivee}
                onChange={d => { setArrivee(d); setResult(null) }}
                placeholder="Destination…"
                dark={true}
                inputStyle={{
                  border: 'none', borderRadius: 0,
                  height: 64, paddingTop: 24, paddingBottom: 8,
                  background: 'transparent', color: '#F6F3EE',
                }}
              />
            </div>

            {/* Date */}
            <div style={{ flex: '0 0 140px', position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)' }}>
              <label style={{
                position: 'absolute', top: 8, left: 16,
                fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--olive)',
              }}>Date</label>
              <input
                type="date"
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#F6F3EE', fontFamily: 'Sora, sans-serif', fontSize: 13,
                  padding: '28px 12px 8px 16px', width: '100%', height: 64,
                  colorScheme: 'dark', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Heure */}
            <div style={{ flex: '0 0 110px', position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)' }}>
              <label style={{
                position: 'absolute', top: 8, left: 16,
                fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--olive)',
              }}>Heure</label>
              <input
                type="time"
                value={heure}
                onChange={e => setHeure(e.target.value)}
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#F6F3EE', fontFamily: 'Sora, sans-serif', fontSize: 13,
                  padding: '28px 12px 8px 16px', width: '100%', height: 64,
                  colorScheme: 'dark', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Boutons : Calculer + Réserver */}
            <div className="fv-form-actions" style={{ display: 'flex', flexShrink: 0 }}>
              <button
                type="submit"
                disabled={(!arrivee?.lat && !arrivee?.km) || calcLoading}
                style={{
                  background: (arrivee?.lat || arrivee?.km) && !calcLoading ? 'var(--olive)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0 20px',
                  cursor: ((arrivee?.lat || arrivee?.km) && !calcLoading) ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', gap: 8,
                  whiteSpace: 'nowrap', transition: 'background 0.25s ease',
                  height: 64, borderRight: '1px solid rgba(246,243,238,0.12)',
                }}
                onMouseEnter={e => { if ((arrivee?.lat || arrivee?.km) && !calcLoading) e.currentTarget.style.background = '#5A6B3A' }}
                onMouseLeave={e => { e.currentTarget.style.background = (arrivee?.lat || arrivee?.km) && !calcLoading ? 'var(--olive)' : 'rgba(255,255,255,0.1)' }}
              >
                {calcLoading ? '…' : <><ArrowRight size={14} weight="bold" /> Calculer</>}
              </button>
              <Link
                to="/contact"
                style={{
                  background: 'rgba(246,243,238,0.08)',
                  color: '#fff',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0 20px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  whiteSpace: 'nowrap', textDecoration: 'none',
                  height: 64, transition: 'background 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(246,243,238,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(246,243,238,0.08)' }}
              >
                Réserver
              </Link>
            </div>
          </form>
        ) : (
          /* Result panel */
          <div
            className="fv-btn fv-mini-form"
            style={{
              display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
              background: 'rgba(246,243,238,0.07)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(107,125,74,0.4)',
              maxWidth: 780, margin: '0 auto',
              padding: '16px 24px',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Sora', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                {result.km} km · tarif {result.isNuit ? 'nuit' : 'jour'}
              </div>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, color: 'var(--olive)', lineHeight: 1 }}>
                ~{result.prix}€
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginLeft: 'auto' }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
                padding: '12px 22px', background: 'var(--olive)',
                transition: 'background 0.25s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#5A6B3A')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--olive)')}
              >
                Réserver <ArrowRight size={12} weight="bold" />
              </Link>
              <a href={CONTACT.telHref} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'Sora', fontSize: 10, color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <Phone size={13} weight="light" /> Appeler
              </a>
              <button onClick={() => setResult(null)} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                fontFamily: 'Sora', fontSize: 10, cursor: 'pointer',
                textDecoration: 'underline', padding: 0,
              }}>
                Modifier
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Véhicules — positionnés à CHEVAL sur la frontière section */}
      {/* bottom: -120px = moitié dans cette section, moitié dans la suivante */}
      <div
        className="fv-vehicles"
        style={{
          position: 'absolute',
          bottom: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '90%',
          maxWidth: 900,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/classe-v-detour.png"
          alt="Mercedes Classe V — Van premium"
          className="fv-van"
          style={{
            height: 'clamp(200px, 30vw, 340px)',
            width: 'auto',
            marginRight: -50,
            position: 'relative',
            zIndex: 1,
          }}
        />
        <img
          src="/images/classe-s-detour.png"
          alt="Mercedes Classe S — Berline prestige"
          className="fv-berline"
          style={{
            height: 'clamp(160px, 24vw, 280px)',
            width: 'auto',
            position: 'relative',
            zIndex: 2,
          }}
        />
      </div>

      {/* Fondu bas */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (min-width: 769px) {
          .fv-section { min-height: 100vh !important; height: auto !important; align-items: center !important; }
          .fv-content-desktop { padding: 0 24px !important; }
        }
        @media (max-width: 768px) {
          .fv-section {
            min-height: 100dvh !important;
            height: auto !important;
            align-items: flex-start !important;
          }
          .fv-content-desktop {
            padding: 90px 20px 40px 20px !important;
            margin-bottom: 180px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .fv-content-desktop h2 {
            font-size: clamp(30px, 8vw, 42px) !important;
          }
          .fv-mini-form {
            flex-direction: column !important;
            max-width: 100% !important;
          }
          .fv-mini-form > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(246,243,238,0.12) !important;
            flex: none !important;
            width: 100% !important;
          }
          .fv-mini-form input[type="date"],
          .fv-mini-form input[type="time"] {
            width: 100% !important;
          }
          .fv-form-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .fv-form-actions button[type="submit"],
          .fv-form-actions a {
            width: 100% !important;
            height: 52px !important;
            justify-content: center !important;
            border-right: none !important;
          }
          .fv-form-actions button[type="submit"] {
            border-bottom: 1px solid rgba(246,243,238,0.12) !important;
          }
          .fv-vehicles { width: 100% !important; max-width: 100% !important; bottom: -70px !important; }
          .fv-van { margin-right: -30px !important; height: 200px !important; }
          .fv-berline { height: 155px !important; }
        }
      `}</style>
    </section>
  )
}
