import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin, CheckCircle, NavigationArrow, Clock } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

// ── Tarifs ───────────────────────────────────────────────
const TARIF_JOUR = 2.22    // €/km  — 7h à 19h
const TARIF_NUIT = 2.88    // €/km  — 19h à 7h
const PRISE_EN_CHARGE = 4.00
const MINIMUM = 12

// ── Destinations populaires (distances depuis Aix-en-Pce)
const DESTINATIONS = [
  { label: 'Aéroport Marseille (MRS)', km: 42 },
  { label: 'Gare TGV Aix-en-Provence', km: 12 },
  { label: 'Marseille Centre', km: 35 },
  { label: 'Aéroport Nice (NCE)', km: 180 },
  { label: 'Cassis / Calanques', km: 50 },
  { label: 'Gordes / Luberon', km: 65 },
  { label: 'Avignon', km: 85 },
  { label: 'Monaco', km: 210 },
  { label: 'Cannes', km: 155 },
  { label: 'Arles', km: 80 },
  { label: 'Autre destination…', km: null },
]

const TRUST_ITEMS = ['Tarif fixe garanti', 'Sans engagement', 'Réponse en 15min']

function getTarif(heure) {
  if (!heure) return TARIF_JOUR
  const [h] = heure.split(':').map(Number)
  return h >= 7 && h < 19 ? TARIF_JOUR : TARIF_NUIT
}

function calcPrix(km, tarif) {
  return Math.max(MINIMUM, +(PRISE_EN_CHARGE + km * tarif).toFixed(2))
}

export default function DevisSimulateur() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  const [destination, setDestination] = useState('')
  const [kmManuel, setKmManuel] = useState('')
  const [heure, setHeure] = useState('')
  const [vehicule, setVehicule] = useState('classe-e')
  const [result, setResult] = useState(null)

  // Km résolu selon sélection
  const destObj = DESTINATIONS.find(d => d.label === destination)
  const kmResolu = destObj?.km ?? (kmManuel ? parseFloat(kmManuel) : null)
  const tarif = getTarif(heure)
  const isNuit = tarif === TARIF_NUIT

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
      gsap.from('.devis-card', {
        y: 60, opacity: 0, scale: 0.97, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.devis-card', start: 'top 85%', once: true },
      })
      gsap.from('.devis-trust-item', {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.devis-trust', start: 'top 90%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleCalculate = (e) => {
    e.preventDefault()
    if (!kmResolu || kmResolu <= 0) return
    const prix = calcPrix(kmResolu, tarif)
    setResult({ km: kmResolu, tarif, isNuit, prix })
    setTimeout(() => {
      gsap.from('.devis-result', { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out' })
    }, 30)
  }

  const inputStyle = {
    background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    color: '#fff', fontFamily: 'Sora, sans-serif', fontSize: 14,
    padding: '14px 0', width: '100%', outline: 'none',
    transition: 'border-color 0.3s ease',
  }
  const labelStyle = {
    fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4,
  }

  return (
    <section ref={sectionRef} id="devis" style={{ background: 'var(--texte)', position: 'relative', overflow: 'hidden' }}>
      <img ref={bgRef} src="/images/vignes-provence.jpg" alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '120%', objectFit: 'cover', opacity: 0.1, pointerEvents: 'none' }} />

      <div className="devis-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--olive)', display: 'inline-block', marginBottom: 16 }}>
            Devis en ligne
          </span>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: '#fff', lineHeight: 1.2, margin: '0 0 16px' }}>
            Estimez votre trajet
          </h2>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 48px' }}>
            Sélectionnez votre destination et obtenez une estimation immédiate à tarif fixe garanti.
          </p>

          {/* Card */}
          <div className="devis-card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', padding: '48px 40px' }}>
            <form onSubmit={handleCalculate}>

              {/* Destination populaire */}
              <div style={{ marginBottom: 32, textAlign: 'left' }}>
                <label style={labelStyle}>
                  <MapPin size={10} style={{ display: 'inline', marginRight: 4 }} />
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={e => { setDestination(e.target.value); setKmManuel(''); setResult(null) }}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                  onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                >
                  <option value="" style={{ background: '#1a1a2e' }}>— Choisissez une destination —</option>
                  {DESTINATIONS.map((d, i) => (
                    <option key={i} value={d.label} style={{ background: '#1a1a2e' }}>
                      {d.label}{d.km ? ` (${d.km} km)` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Km manuel si "Autre" */}
              {destObj?.km === null && (
                <div style={{ marginBottom: 32, textAlign: 'left' }}>
                  <label style={labelStyle}>Distance en kilomètres</label>
                  <input
                    type="number"
                    min="1"
                    max="2000"
                    placeholder="Ex : 120"
                    value={kmManuel}
                    onChange={e => { setKmManuel(e.target.value); setResult(null) }}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
              )}

              {/* Row — Heure / Véhicule */}
              <div className="devis-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
                <div style={{ textAlign: 'left' }}>
                  <label style={labelStyle}>
                    <Clock size={10} style={{ display: 'inline', marginRight: 4 }} />
                    Heure de départ
                  </label>
                  <input
                    type="time"
                    value={heure}
                    onChange={e => { setHeure(e.target.value); setResult(null) }}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                  {heure && (
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, color: isNuit ? '#F6AD55' : 'var(--olive)', marginTop: 5, display: 'block' }}>
                      {isNuit ? `🌙 Tarif nuit — ${TARIF_NUIT} €/km` : `☀️ Tarif jour — ${TARIF_JOUR} €/km`}
                    </span>
                  )}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label style={labelStyle}>Véhicule</label>
                  <select
                    value={vehicule}
                    onChange={e => setVehicule(e.target.value)}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  >
                    <option value="classe-e" style={{ background: '#1a1a2e' }}>Classe E — Berline</option>
                    <option value="classe-s" style={{ background: '#1a1a2e' }}>Classe S — Prestige</option>
                    <option value="classe-v" style={{ background: '#1a1a2e' }}>Classe V — Van 7 places</option>
                  </select>
                </div>
              </div>

              {/* Résultat */}
              {result && (
                <div className="devis-result" style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '24px 28px', marginBottom: 28,
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, textAlign: 'left',
                }}>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Distance</div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#fff' }}>
                      {result.km} <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>km</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Tarif appliqué</div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: result.isNuit ? '#F6AD55' : 'var(--olive)' }}>
                      {result.tarif}€ <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>/km</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Estimation</div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'var(--olive)', fontWeight: 400 }}>
                      ~{result.prix}€
                    </div>
                  </div>
                  <div style={{ gridColumn: '1/-1', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Sora, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.28)' }}>
                    Prise en charge {PRISE_EN_CHARGE}€ incluse · Minimum {MINIMUM}€ · Péages non inclus · Prix définitif confirmé à la réservation
                  </div>
                </div>
              )}

              {/* Bouton */}
              <button
                type="submit"
                disabled={!kmResolu}
                style={{
                  width: '100%',
                  background: kmResolu ? 'var(--olive)' : 'rgba(255,255,255,0.08)',
                  color: kmResolu ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: 'none', fontFamily: 'Sora, sans-serif', fontSize: 11,
                  fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em',
                  padding: '18px 32px', cursor: kmResolu ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => { if (kmResolu) e.currentTarget.style.background = '#5A6B3A' }}
                onMouseLeave={e => { if (kmResolu) e.currentTarget.style.background = 'var(--olive)' }}
              >
                <NavigationArrow size={14} weight="bold" />
                {result ? 'RECALCULER' : 'CALCULER MON DEVIS'}
                <ArrowRight size={14} weight="bold" />
              </button>
            </form>
          </div>

          {/* Trust */}
          <div className="devis-trust" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="devis-trust-item" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Sora, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                <CheckCircle size={12} weight="duotone" style={{ color: 'var(--olive)' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .devis-container { padding: 80px 24px !important; }
          .devis-card { padding: 32px 20px !important; }
          .devis-field-row { grid-template-columns: 1fr !important; }
          .devis-result { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
