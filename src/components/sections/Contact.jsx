import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle, Phone, EnvelopeSimple, Users } from '@phosphor-icons/react'
import { SECTION_INTROS, IMAGES } from '../../data/content'
import { supabase } from '../../lib/supabase'
import AddressAutocomplete from '../ui/AddressAutocomplete'

gsap.registerPlugin(ScrollTrigger)

const SERVICES_OPTIONS = [
  'Transfert Aéroport',
  'Déplacement Affaires',
  'Événements & Soirées',
  'Longue Distance',
  'Visite Touristique',
]

const VEHICULES = [
  {
    id: 'classe-e',
    nom: 'Classe E',
    tag: 'Business',
    pax: '1–4 passagers',
    img: '/images/classe-e-provence.jpg',
  },
  {
    id: 'classe-s',
    nom: 'Classe S',
    tag: 'Prestige',
    pax: '1–4 passagers',
    img: '/images/classe-s-provence.jpg',
  },
  {
    id: 'classe-v',
    nom: 'Classe V',
    tag: 'Grand format',
    pax: '1–7 passagers',
    img: '/images/classe-v-provence.jpg',
  },
]

const lbl = {
  fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600,
  textTransform: 'uppercase', letterSpacing: '0.2em',
  color: 'var(--texte-light)', display: 'block', marginBottom: 6,
}

const inp = {
  width: '100%', fontFamily: 'Sora, sans-serif', fontSize: 13,
  color: 'var(--texte)', background: 'transparent', border: 'none',
  borderBottom: '1px solid var(--border)', padding: '9px 0',
  outline: 'none', transition: 'border-color 0.25s',
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({
    nom: '', tel: '', destination: null, vehicule: '', service: '', date_heure: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) { setForm(f => ({ ...f, [field]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.nom.trim()) return setError('Votre nom est obligatoire.')
    setLoading(true)
    const { error: insertError } = await supabase.from('reservations').insert({
      nom_client: form.nom.trim(),
      tel_client: form.tel.trim() || null,
      depart: form.message.trim() || null,
      destination: form.destination?.label || null,
      date_heure: form.date_heure ? new Date(form.date_heure).toISOString() : new Date().toISOString(),
      marque: 'provencal', source: 'site', statut: 'nouvelle', user_id: null,
      notes: [form.vehicule && `Véhicule: ${form.vehicule}`, form.service && `Service: ${form.service}`].filter(Boolean).join(' | ') || null,
    })
    setLoading(false)
    if (insertError) { setError('Une erreur est survenue. Appelez-nous directement.'); return }
    setSuccess(true)
    setForm({ nom: '', tel: '', destination: null, vehicule: '', service: '', date_heure: '', message: '' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info', {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.contact-form', {
        x: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const focus = e => (e.target.style.borderBottomColor = 'var(--lavande)')
  const blur  = e => (e.target.style.borderBottomColor = 'var(--border)')

  return (
    <section ref={sectionRef} id="contact" style={{ background: 'var(--cream)' }}>

      {/* Top accent bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--olive) 0%, var(--lavande) 100%)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <span style={{
            fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--olive)',
          }}>Réservation</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <a href="tel:+33615963275" style={{
            fontFamily: 'Sora', fontSize: 10, fontWeight: 600,
            color: 'var(--texte-light)', textDecoration: 'none', letterSpacing: '0.05em',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Phone size={11} weight="duotone" style={{ color: 'var(--olive)' }} />
            06 15 96 32 75
          </a>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '0.42fr 1fr',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>

          {/* Left — Dark info panel */}
          <div className="contact-info" style={{
            background: 'var(--texte)', padding: '40px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Bg image */}
            <img src={IMAGES.contactFond} alt="" aria-hidden="true" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.07, pointerEvents: 'none',
            }} />

            {/* Decorative large number */}
            <span style={{
              position: 'absolute', bottom: -8, right: 12,
              fontFamily: "'Instrument Serif', serif", fontSize: 140,
              color: 'rgba(255,255,255,0.04)', lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
            }}>01</span>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Olive accent line */}
              <div style={{ width: 32, height: 2, background: 'var(--olive)', marginBottom: 20 }} />

              <h2 style={{
                fontFamily: "'Instrument Serif', serif", fontSize: 26,
                fontWeight: 400, color: '#fff', margin: '0 0 12px', lineHeight: 1.25,
              }}>
                Réservez votre<br />
                <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>chauffeur</em>
              </h2>

              <p style={{
                fontFamily: 'Sora', fontSize: 12, color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7, marginBottom: 28,
              }}>
                {SECTION_INTROS.contact}
              </p>

              {/* Contact links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                <a href="tel:+33615963275" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'Sora', fontSize: 13,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: 14,
                }}>
                  <Phone size={14} weight="duotone" style={{ color: 'var(--olive)', flexShrink: 0 }} />
                  06 15 96 32 75
                </a>
                <a href="mailto:provencalcoastdriver@gmail.com" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Sora', fontSize: 11,
                }}>
                  <EnvelopeSimple size={13} weight="duotone" style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  provencalcoastdriver@gmail.com
                </a>
              </div>

              {/* Trust badges */}
              {[
                'Licence VTC officielle',
                '4.9/5 · 200+ avis Google',
                'Disponible 24h/24',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                  <CheckCircle size={12} weight="duotone" style={{ color: 'var(--olive)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Sora', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: 'Sora', fontSize: 9, color: 'rgba(255,255,255,0.2)',
              margin: 0, lineHeight: 1.5, position: 'relative', zIndex: 1, marginTop: 24,
            }}>
              Licence VTC — SIRET N°013230073<br />
              82 avenue Henri Mauriat, 13100 Aix-en-Provence
            </p>
          </div>

          {/* Right — Form */}
          <div className="contact-form" style={{ background: 'var(--surface)', padding: '36px 40px' }}>

            {success ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', minHeight: 280, gap: 14, textAlign: 'center',
              }}>
                <CheckCircle size={44} weight="duotone" style={{ color: 'var(--olive)' }} />
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: 'var(--texte)', margin: 0 }}>
                  Demande envoyée
                </p>
                <p style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', margin: 0, lineHeight: 1.6 }}>
                  Nous vous confirmons sous 15 minutes.<br />
                  Urgent&nbsp;: <a href="tel:+33615963275" style={{ color: 'var(--olive)' }}>06 15 96 32 75</a>
                </p>
                <button onClick={() => setSuccess(false)} style={{
                  fontFamily: 'Sora', fontSize: 10, color: 'var(--texte-light)',
                  background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline',
                }}>Nouvelle demande</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Nom + Téléphone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 22 }}>
                  <div>
                    <label style={lbl}>Nom *</label>
                    <input type="text" placeholder="Votre nom" value={form.nom}
                      onChange={e => update('nom', e.target.value)}
                      style={inp} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label style={lbl}>Téléphone</label>
                    <input type="tel" placeholder="06 00 00 00 00" value={form.tel}
                      onChange={e => update('tel', e.target.value)}
                      style={inp} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                {/* Destination */}
                <div style={{ marginBottom: 22 }}>
                  <label style={lbl}>Destination</label>
                  <AddressAutocomplete
                    value={form.destination}
                    onChange={d => update('destination', d)}
                    placeholder="Aéroport, gare, ville, adresse…"
                    dark={false}
                    inputStyle={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', borderRadius: 0 }}
                  />
                  {form.destination?.km && (
                    <span style={{ fontFamily: 'Sora', fontSize: 10, color: 'var(--olive)', marginTop: 4, display: 'block' }}>
                      {form.destination.km} km depuis Aix-en-Provence
                    </span>
                  )}
                </div>

                {/* Véhicule */}
                <div style={{ marginBottom: 22 }}>
                  <label style={lbl}>Votre véhicule</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 4 }}>
                    {VEHICULES.map(v => {
                      const sel = form.vehicule === v.id
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => update('vehicule', sel ? '' : v.id)}
                          style={{
                            position: 'relative', padding: 0, border: 'none',
                            cursor: 'pointer', background: 'none', textAlign: 'left',
                            outline: sel ? '2px solid var(--olive)' : '1px solid var(--border)',
                            outlineOffset: sel ? 2 : 0,
                            transition: 'outline 0.2s',
                          }}
                        >
                          {/* Image */}
                          <div style={{ overflow: 'hidden', height: 72 }}>
                            <img src={v.img} alt={v.nom} style={{
                              width: '100%', height: '100%', objectFit: 'cover',
                              transition: 'transform 0.4s ease',
                              transform: sel ? 'scale(1.06)' : 'scale(1)',
                            }} />
                          </div>
                          {/* Overlay on selected */}
                          {sel && (
                            <div style={{
                              position: 'absolute', inset: 0, pointerEvents: 'none',
                              background: 'rgba(107,125,74,0.12)',
                            }} />
                          )}
                          {/* Label */}
                          <div style={{
                            padding: '6px 8px',
                            background: sel ? 'var(--olive)' : 'var(--surface)',
                            transition: 'background 0.2s',
                          }}>
                            <p style={{
                              fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                              color: sel ? '#fff' : 'var(--texte)',
                              margin: 0, lineHeight: 1.2,
                            }}>{v.nom}</p>
                            <p style={{
                              fontFamily: 'Sora', fontSize: 9,
                              color: sel ? 'rgba(255,255,255,0.7)' : 'var(--texte-light)',
                              margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: 3,
                            }}>
                              <Users size={9} /> {v.pax}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Service + Date sur la même ligne */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 22 }}>
                  <div>
                    <label style={lbl}>Service</label>
                    <select value={form.service} onChange={e => update('service', e.target.value)}
                      style={{ ...inp, appearance: 'none', cursor: 'pointer' }}
                      onFocus={focus} onBlur={blur}>
                      <option value="">Choisir un service</option>
                      {SERVICES_OPTIONS.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Date & heure</label>
                    <input type="datetime-local" value={form.date_heure}
                      onChange={e => update('date_heure', e.target.value)}
                      style={inp} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 24 }}>
                  <label style={lbl}>Message (optionnel)</label>
                  <textarea rows={3} placeholder="Départ précis, numéro de vol, demande particulière…"
                    value={form.message} onChange={e => update('message', e.target.value)}
                    style={{ ...inp, resize: 'none' }}
                    onFocus={focus} onBlur={blur} />
                </div>

                {error && (
                  <p style={{ fontFamily: 'Sora', fontSize: 11, color: '#e53e3e', marginBottom: 14 }}>{error}</p>
                )}

                {/* CTA */}
                <button type="submit" disabled={loading} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: loading ? 'rgba(107,125,74,0.5)' : 'var(--olive)', color: '#fff',
                  padding: '15px 32px', border: 'none',
                  fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5A6B3A' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--olive)' }}
                >
                  {loading ? 'Envoi…' : 'Envoyer la demande'}
                  {!loading && <ArrowRight size={13} weight="bold" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
