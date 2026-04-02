import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin, Check, Loader, Navigation } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Tarifs ──────────────────────────────────────────────
const TARIF_JOUR = 2.22   // €/km — 7h à 19h
const TARIF_NUIT = 2.88   // €/km — 19h à 7h
const PRISE_EN_CHARGE = 4.00
const MINIMUM = 12

const TRUST_ITEMS = ['Tarif fixe garanti', 'Sans engagement', 'Réponse en 15min']

// ── Nominatim autocomplete (OpenStreetMap — sans clé) ──
let debounceTimer = null
async function searchAddresses(query) {
  if (query.length < 3) return []
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&countrycodes=fr&addressdetails=1`,
      { headers: { 'Accept-Language': 'fr' } }
    )
    const data = await res.json()
    return data.map(item => ({
      label: item.display_name.replace(/, France$/, ''),
      short: [item.address?.road, item.address?.city || item.address?.town || item.address?.village].filter(Boolean).join(', ') || item.display_name.split(',').slice(0, 2).join(','),
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }))
  } catch { return [] }
}

// ── OSRM distance réelle (sans clé) ─────────────────────
async function calcDistance(from, to) {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`
  )
  const data = await res.json()
  if (data.code !== 'Ok') throw new Error('Itinéraire introuvable')
  return {
    km: Math.round(data.routes[0].distance / 100) / 10,
    min: Math.round(data.routes[0].duration / 60),
  }
}

// ── Déterminer tarif selon heure ─────────────────────────
function getTarif(heure) {
  if (!heure) return TARIF_JOUR
  const [h] = heure.split(':').map(Number)
  return (h >= 7 && h < 19) ? TARIF_JOUR : TARIF_NUIT
}

// ── Composant AutocompleteInput ──────────────────────────
function AutocompleteInput({ label, placeholder, value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapRef = useRef(null)

  const handleChange = (e) => {
    const v = e.target.value
    onChange(v)
    clearTimeout(debounceTimer)
    if (v.length < 3) { setSuggestions([]); setOpen(false); return }
    setLoading(true)
    debounceTimer = setTimeout(async () => {
      const res = await searchAddresses(v)
      setSuggestions(res)
      setOpen(res.length > 0)
      setLoading(false)
    }, 400)
  }

  const handleSelect = (item) => {
    onChange(item.short)
    onSelect(item)
    setSuggestions([])
    setOpen(false)
  }

  // Fermer si clic extérieur
  useEffect(() => {
    const handler = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const labelStyle = {
    fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 4,
  }
  const inputStyle = {
    background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    color: '#fff', fontFamily: 'Sora, sans-serif', fontSize: 14,
    padding: '14px 28px 14px 0', width: '100%', outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  return (
    <div ref={wrapRef} style={{ textAlign: 'left', position: 'relative' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
          onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
          style={inputStyle}
          autoComplete="off"
        />
        <div style={{ position: 'absolute', right: 0, bottom: 14, pointerEvents: 'none' }}>
          {loading
            ? <Loader size={15} strokeWidth={1.5} style={{ color: 'var(--olive)', animation: 'spin 1s linear infinite' }} />
            : <MapPin size={15} strokeWidth={1.5} style={{ color: 'var(--olive)' }} />
          }
        </div>
      </div>

      {/* Dropdown suggestions */}
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
          background: '#1A1F2E', border: '1px solid rgba(255,255,255,0.12)',
          borderTop: 'none', maxHeight: 220, overflowY: 'auto',
        }}>
          {suggestions.map((s, i) => (
            <div
              key={i}
              onMouseDown={() => handleSelect(s)}
              style={{
                padding: '10px 14px', cursor: 'pointer',
                fontFamily: 'Sora, sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.75)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'background 0.2s',
                lineHeight: 1.4,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: 'var(--olive)', marginRight: 6, fontSize: 10 }}>●</span>
              {s.short}
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                {s.label.split(',').slice(1, 3).join(',')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Composant principal ──────────────────────────────────
export default function DevisSimulateur() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  const [depart, setDepart] = useState('')
  const [arrivee, setArrivee] = useState('')
  const [departCoords, setDepartCoords] = useState(null)
  const [arriveeCoords, setArriveeCoords] = useState(null)
  const [heure, setHeure] = useState('')
  const [vehicule, setVehicule] = useState('classe-e')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

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

  const handleCalculate = useCallback(async (e) => {
    e.preventDefault()
    if (!departCoords || !arriveeCoords) {
      setError('Veuillez sélectionner des adresses dans la liste.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const { km, min } = await calcDistance(departCoords, arriveeCoords)
      const tarif = getTarif(heure)
      const isNuit = tarif === TARIF_NUIT
      const prix = Math.max(MINIMUM, PRISE_EN_CHARGE + km * tarif)
      const prixRound = Math.round(prix * 10) / 10
      setResult({ km, min, tarif, isNuit, prix: prixRound })

      // Animate result in
      setTimeout(() => {
        gsap.from('.devis-result', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      }, 50)
    } catch {
      setError('Impossible de calculer l\'itinéraire. Vérifiez les adresses.')
    } finally {
      setLoading(false)
    }
  }, [departCoords, arriveeCoords, heure, vehicule])

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
            Renseignez votre trajet et obtenez une estimation immédiate à tarif fixe garanti.
          </p>

          {/* Glass card */}
          <div className="devis-card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', padding: '48px 40px' }}>
            <form onSubmit={handleCalculate}>

              {/* Row 1 — Départ / Arrivée avec autocomplete */}
              <div className="devis-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                <AutocompleteInput
                  label="Départ"
                  placeholder="Adresse de départ"
                  value={depart}
                  onChange={v => { setDepart(v); setDepartCoords(null); setResult(null) }}
                  onSelect={item => setDepartCoords(item)}
                />
                <AutocompleteInput
                  label="Arrivée"
                  placeholder="Adresse d'arrivée"
                  value={arrivee}
                  onChange={v => { setArrivee(v); setArriveeCoords(null); setResult(null) }}
                  onSelect={item => setArriveeCoords(item)}
                />
              </div>

              {/* Row 2 — Heure / Véhicule */}
              <div className="devis-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
                <div style={{ textAlign: 'left' }}>
                  <label style={labelStyle}>Heure de départ</label>
                  <input
                    type="time"
                    value={heure}
                    onChange={e => { setHeure(e.target.value); setResult(null) }}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                  {heure && (
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, color: getTarif(heure) === TARIF_NUIT ? '#F6AD55' : 'var(--olive)', marginTop: 4, display: 'block' }}>
                      {getTarif(heure) === TARIF_NUIT ? `Tarif nuit — ${TARIF_NUIT}€/km` : `Tarif jour — ${TARIF_JOUR}€/km`}
                    </span>
                  )}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label style={labelStyle}>Véhicule</label>
                  <select
                    value={vehicule}
                    onChange={e => { setVehicule(e.target.value); setResult(null) }}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  >
                    <option value="classe-e" style={{ background: '#2A2A2A' }}>Classe E — Berline</option>
                    <option value="classe-s" style={{ background: '#2A2A2A' }}>Classe S — Prestige</option>
                    <option value="classe-v" style={{ background: '#2A2A2A' }}>Classe V — Van 7 places</option>
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: '#FC8181', marginBottom: 16, textAlign: 'left' }}>
                  {error}
                </div>
              )}

              {/* Résultat */}
              {result && (
                <div className="devis-result" style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '24px 28px', marginBottom: 32, textAlign: 'left',
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
                }}>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Distance</div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff' }}>{result.km} <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>km</span></div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Durée estimée</div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff' }}>{result.min} <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>min</span></div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
                      Estimation {result.isNuit ? '🌙 nuit' : '☀️ jour'}
                    </div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: 'var(--olive)' }}>
                      ~{result.prix}€
                    </div>
                  </div>
                  <div style={{ gridColumn: '1/-1', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Sora, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                    Tarif {result.isNuit ? `nuit (${TARIF_NUIT}€/km)` : `jour (${TARIF_JOUR}€/km)`} · Prise en charge {PRISE_EN_CHARGE}€ · Minimum {MINIMUM}€ · Péages non inclus
                  </div>
                </div>
              )}

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', background: loading ? 'rgba(255,255,255,0.1)' : 'var(--olive)',
                  color: '#fff', border: 'none', fontFamily: 'Sora, sans-serif', fontSize: 11,
                  fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em',
                  padding: '18px 32px', cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5A6B3A' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--olive)' }}
              >
                {loading ? (
                  <>
                    <Loader size={14} strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }} />
                    CALCUL EN COURS…
                  </>
                ) : (
                  <>
                    <Navigation size={14} strokeWidth={2} />
                    {result ? 'RECALCULER' : 'CALCULER MON DEVIS'}
                    <ArrowRight size={14} strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Trust line */}
          <div className="devis-trust" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="devis-trust-item" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Sora, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                <Check size={12} strokeWidth={2} style={{ color: 'var(--olive)' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
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
