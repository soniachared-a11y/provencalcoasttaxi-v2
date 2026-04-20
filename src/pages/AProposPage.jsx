import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ShieldCheck, Clock, Crown, MapPin, Star,
  ArrowRight, Handshake, Trophy, UserCircle,
} from '@phosphor-icons/react'
import { ABOUT, CHIFFRES, ZONES_EXTRA, CONTACT } from '../data/content'
import SEOHead from '../seo/SEOHead'
import CharReveal from '../components/ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

const VALEURS = [
  {
    icon: ShieldCheck,
    titre: 'Sécurité & Confiance',
    desc: 'Chauffeur licencié VTC, assurance tous risques, véhicules contrôlés chaque semaine. Votre sécurité est notre priorité absolue — sans compromis.',
    color: 'var(--bleu)',
  },
  {
    icon: Clock,
    titre: 'Ponctualité Absolue',
    desc: 'Suivi de vol en temps réel, anticipation du trafic, arrivée garantie 10 minutes avant l\'heure. Le retard n\'est tout simplement pas une option.',
    color: 'var(--olive)',
  },
  {
    icon: Crown,
    titre: 'Service Conciergerie',
    desc: 'Recommandations restaurants, réservations hôtels, itinéraires sur mesure. Chaque trajet devient une expérience complète de la Provence.',
    color: 'var(--lavande)',
  },
]

const ENGAGEMENTS = [
  { label: 'Tarifs 100% fixes', detail: 'Le prix annoncé est le prix payé' },
  { label: 'Confirmation en 15min', detail: 'Réponse garantie 24h/24' },
  { label: 'Annulation gratuite', detail: 'Jusqu\'à 24h avant le départ' },
  { label: 'Bilingue FR / EN', detail: 'Service en français et anglais' },
  { label: 'Mercedes récente', detail: 'Flotte renouvelée régulièrement' },
  { label: 'Entretien quotidien', detail: 'Véhicules contrôlés chaque jour' },
]

export default function AProposPage() {
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const storyRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Story section
      if (storyRef.current) {
        gsap.from(storyRef.current.querySelectorAll('.story-item'), {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
            once: true,
          },
        })
      }

      // Valeurs cards
      gsap.from('.valeur-card', {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.valeurs-grid',
          start: 'top 80%',
          once: true,
        },
      })

      // Chiffres counter
      gsap.from('.chiffre-item', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.chiffres-band',
          start: 'top 80%',
          once: true,
        },
      })

      // Zones items slide in
      gsap.from('.zone-entry', {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.zones-section',
          start: 'top 80%',
          once: true,
        },
      })

      // Engagements
      gsap.from('.engagement-item', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.engagements-grid',
          start: 'top 80%',
          once: true,
        },
      })

      // Hero content in
      gsap.from('.hero-about-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEOHead
        path="/a-propos"
        title="À propos — Taxis Provençale Aix | Chauffeur privé depuis 10 ans à Aix-en-Provence"
        description="Découvrez Taxis Provençale Aix : plus de 10 ans d'expérience en transport privé haut de gamme en Provence. Chauffeurs bilingues, flotte Mercedes entretenue quotidiennement, service 24h/24."
      />
      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="page-hero"
        style={{
          position: 'relative',
          height: '80vh',
          minHeight: 520,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          ref={heroBgRef}
          src="/images/lavande-provence.jpg"
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
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(110deg, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.55) 60%, rgba(107,96,145,0.4) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: 160,
          background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)',
        }} />

        <div
          className="hero-about-content"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 800,
            padding: '0 clamp(24px, 5vw, 80px)',
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Link to="/" style={{ fontFamily: 'Sora', fontSize: 10, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Accueil
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>/</span>
            <span style={{ fontFamily: 'Sora', fontSize: 10, color: 'var(--lavande)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              À propos
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <UserCircle size={20} weight="duotone" style={{ color: 'var(--lavande)' }} />
            <span style={{
              fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--lavande)',
            }}>
              Notre Histoire
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.1,
            margin: '0 0 20px',
          }}>
            Votre chauffeur privé
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>en Provence depuis 10 ans</span>
          </h1>

          <p style={{
            fontFamily: 'Sora',
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: 0,
          }}>
            Fondé sur une conviction simple : le transport privé en Provence mérite le même niveau
            d'exigence que l'hôtellerie de luxe.
          </p>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────── */}
      <section
        ref={storyRef}
        style={{ background: 'var(--cream)', padding: 'clamp(60px, 8vw, 100px) 24px' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
            }}
            className="story-grid"
          >
            {/* Texte */}
            <div>
              <span className="story-item" style={{
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--olive)', display: 'block', marginBottom: 16,
              }}>
                Notre ADN
              </span>
              <CharReveal
                text="Plus de 10 ans au service de la Provence"
                as="h2"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  fontWeight: 400,
                  color: 'var(--texte)',
                  lineHeight: 1.2,
                  margin: '0 0 32px',
                }}
              />

              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="story-item" style={{
                  fontFamily: 'Sora',
                  fontSize: 14,
                  color: 'var(--texte-light)',
                  lineHeight: 1.85,
                  margin: '0 0 20px',
                }}>
                  {p}
                </p>
              ))}

              {/* Engagements */}
              <div className="story-item engagements-grid" style={{ marginTop: 36 }}>
                <div style={{
                  fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.2em',
                  color: 'var(--texte)', marginBottom: 16,
                }}>
                  Nos engagements
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 24px',
                }}>
                  {ENGAGEMENTS.map((e, i) => (
                    <div key={i} className="engagement-item">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: 'var(--lavande)', flexShrink: 0, marginTop: 6,
                        }} />
                        <div>
                          <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: 'var(--texte)', marginBottom: 2 }}>
                            {e.label}
                          </div>
                          <div style={{ fontFamily: 'Sora', fontSize: 11, color: 'var(--texte-light)' }}>
                            {e.detail}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="story-item" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -16, left: -16, right: 16, bottom: 16,
                border: '1px solid var(--border)',
                pointerEvents: 'none',
              }} />
              <img
                src="/images/flotte-hotel-luxe.jpg"
                alt="Chauffeur Taxis Provençale Aix"
                width={1200}
                height={800}
                loading="lazy"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(20%)',
                }}
              />
              {/* Overlay badge */}
              <div style={{
                position: 'absolute',
                bottom: 32,
                right: 0,
                background: 'var(--texte)',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} weight="fill" style={{ color: '#F6AD55' }} />
                  ))}
                </div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#fff' }}>4.9 / 5</div>
                <div style={{ fontFamily: 'Sora', fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>200+ avis Google</div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .story-grid > div:first-child { order: 2; }
            .story-grid > div:last-child { order: 1; }
          }
        `}</style>
      </section>

      {/* ── VALEURS ───────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--lavande)', display: 'block', marginBottom: 16,
            }}>
              Ce qui nous définit
            </span>
            <CharReveal
              text="Nos valeurs fondamentales"
              as="h2"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 400,
                color: 'var(--texte)',
                margin: 0,
              }}
            />
          </div>

          <div className="valeurs-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            border: '1px solid var(--border)',
          }}>
            {VALEURS.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={i}
                  className="valeur-card"
                  style={{
                    padding: 40,
                    borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.4s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-alt)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Accent line top */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: v.color, opacity: 0.5 }} />

                  <div style={{
                    width: 48, height: 48,
                    background: `${v.color}12`,
                    border: `1px solid ${v.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24,
                  }}>
                    <Icon size={24} weight="duotone" style={{ color: v.color }} />
                  </div>

                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'var(--texte)',
                    margin: '0 0 14px',
                    lineHeight: 1.2,
                  }}>
                    {v.titre}
                  </h3>

                  <p style={{
                    fontFamily: 'Sora',
                    fontSize: 13,
                    color: 'var(--texte-light)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {v.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .valeurs-grid { grid-template-columns: 1fr !important; }
            .valeur-card { border-right: none !important; border-bottom: 1px solid var(--border); }
            .valeur-card:last-child { border-bottom: none; }
          }
        `}</style>
      </section>

      {/* ── CHIFFRES CLÉS ─────────────────────────────────── */}
      <section
        className="chiffres-band"
        style={{ background: 'var(--texte)', padding: 'clamp(60px, 8vw, 80px) 24px' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--olive)' }}>
              En chiffres
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="chiffres-stats">
            {CHIFFRES.map((c, i) => (
              <div
                key={i}
                className="chiffre-item"
                style={{
                  textAlign: 'center',
                  padding: '32px 16px',
                  borderRight: i < CHIFFRES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {c.value}{c.suffix}
                </div>
                <div style={{
                  fontFamily: 'Sora', fontSize: 12, fontWeight: 600,
                  color: 'var(--olive)', textTransform: 'uppercase',
                  letterSpacing: '0.1em', marginBottom: 4,
                }}>
                  {c.label}
                </div>
                <div style={{ fontFamily: 'Sora', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .chiffres-stats { grid-template-columns: 1fr 1fr !important; }
            .chiffre-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
            .chiffre-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.07) !important; }
          }
        `}</style>
      </section>

      {/* ── ZONES COUVERTES ───────────────────────────────── */}
      <section className="zones-section" style={{ background: 'var(--cream)', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="zones-grid-layout">
            {/* Left: intro + image */}
            <div>
              <span style={{
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--olive)', display: 'block', marginBottom: 16,
              }}>
                Zone de service
              </span>
              <CharReveal
                text="Partout en Provence et au-delà"
                as="h2"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 400,
                  color: 'var(--texte)',
                  margin: '0 0 20px',
                  lineHeight: 1.2,
                }}
              />
              <p style={{ fontFamily: 'Sora', fontSize: 14, color: 'var(--texte-light)', lineHeight: 1.8, margin: '0 0 32px' }}>
                Basé à Aix-en-Provence, nous intervenons sur l'ensemble de la région PACA,
                vers les aéroports, gares TGV, et jusqu'en France entière sur demande.
              </p>
              <img
                src="/images/vignes-provence.jpg"
                alt="Vignobles de Provence au soleil couchant"
                width={1200}
                height={800}
                loading="lazy"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(20%)',
                }}
              />
            </div>

            {/* Right: zones list */}
            <div>
              <div style={{
                fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--texte)', marginBottom: 20,
              }}>
                Dessertes principales
              </div>
              <div style={{ marginBottom: 32 }}>
                {ABOUT.zones.map((zone, i) => (
                  <div key={i} className="zone-entry" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <MapPin size={14} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Sora', fontSize: 13, color: 'var(--texte)', fontWeight: 400 }}>
                      {zone}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--texte)', marginBottom: 16,
              }}>
                Villes PACA
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ZONES_EXTRA.map((ville, i) => (
                  <span key={i} className="zone-entry" style={{
                    fontFamily: 'Sora',
                    fontSize: 11,
                    color: 'var(--texte-light)',
                    border: '1px solid var(--border)',
                    padding: '5px 12px',
                    background: 'var(--surface)',
                    transition: 'border-color 0.3s, color 0.3s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lavande)'; e.currentTarget.style.color = 'var(--lavande)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--texte-light)' }}
                  >
                    {ville}
                  </span>
                ))}
              </div>

              {/* Longue distance */}
              <div style={{
                marginTop: 28,
                padding: '20px 20px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}>
                <Handshake size={24} weight="duotone" style={{ color: 'var(--olive)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, fontWeight: 600, color: 'var(--texte)', marginBottom: 4 }}>
                    France & Europe sur demande
                  </div>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', lineHeight: 1.6 }}>
                    Nice, Lyon, Monaco, Cannes et au-delà. Tarif kilométrique négocié pour les longues distances.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .zones-grid-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ── PARTENAIRES ───────────────────────────────────── */}
      <section style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Sora', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--texte-faint)', marginBottom: 24 }}>
            Nos partenariats
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 40 }}>
            {[
              { name: 'Pays d\'Aix', sub: 'Communauté' },
              { name: 'SNCF', sub: 'Gare TGV' },
              { name: 'Aéroport MRS', sub: 'Marseille Provence' },
              { name: 'Médical', sub: 'Transport conventionné' },
              { name: 'Hôtels 5★', sub: 'Partenaire officiel' },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, color: 'var(--texte)', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontFamily: 'Sora', fontSize: 10, color: 'var(--texte-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────── */}
      <section style={{
        background: 'var(--texte)',
        padding: 'clamp(60px, 8vw, 100px) 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/classe-s-bastide.jpg"
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.08,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Trophy size={32} weight="duotone" style={{ color: 'var(--lavande)', marginBottom: 20 }} />
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400, color: '#fff',
            margin: '0 0 16px',
          }}>
            Vivez l'expérience Taxis Provençale Aix
          </h2>
          <p style={{
            fontFamily: 'Sora', fontSize: 14, color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7, margin: '0 auto 36px', maxWidth: 440,
          }}>
            Réservez en 2 minutes. Confirmation immédiate. Chauffeur disponible 24h/24.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              background: 'var(--olive)', color: '#fff',
              fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '16px 36px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 0.3s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5A6B3A'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--olive)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Réserver maintenant <ArrowRight size={14} />
            </Link>
            <Link to="/flotte" style={{
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Sora', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '16px 36px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >
              Voir la flotte <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
