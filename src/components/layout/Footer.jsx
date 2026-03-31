import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, CreditCard, Clock } from 'lucide-react'
import { IMAGES, TRUST } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Flotte', href: '#flotte' },
  { label: 'Zones', href: '#zones' },
  { label: 'Avis', href: '#avis' },
  { label: 'Contact', href: '#contact' },
]

const SERVICE_LINKS = [
  'Transfert Aéroport',
  'Déplacement Affaires',
  'Événements & Soirées',
  'Longue Distance',
  'Visite Touristique',
]

const ICON_MAP = { Shield, CreditCard, Clock }

export default function Footer() {
  const footerRef = useRef(null)
  const trustRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-grid > div', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      })
      gsap.from('.trust-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trustRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Trust bar */}
      <div ref={trustRef} style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '40px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
          textAlign: 'center',
        }}>
          {TRUST.map((item, i) => {
            const Icon = ICON_MAP[item.icon]
            return (
              <div key={i} className="trust-item">
                {Icon && <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--lavande)', marginBottom: 12 }} />}
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--texte)',
                  marginBottom: 4,
                }}>
                  {item.titre}
                </div>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11,
                  color: 'var(--texte-light)',
                }}>
                  {item.desc}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <footer ref={footerRef} style={{
        background: 'var(--texte)',
        padding: '48px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src={IMAGES.footerFond}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.06,
          }}
        />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* 4 columns */}
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 0.7fr 0.7fr 1.1fr',
            gap: 48,
            marginBottom: 48,
          }}>
            {/* Col 1 — Logo + desc */}
            <div>
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 20,
                color: '#fff',
                display: 'block',
                marginBottom: 16,
              }}>
                Provençal Coast
              </span>
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Votre chauffeur privé Mercedes à Aix-en-Provence. Plus de 10 ans d'expérience au service de l'excellence, disponible 24h/24 pour particuliers et professionnels.
              </p>
            </div>

            {/* Col 2 — Liens rapides */}
            <div>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 9,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                display: 'block',
                marginBottom: 20,
              }}>
                Liens rapides
              </span>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                {LINKS.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Col 3 — Services */}
            <div>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 9,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                display: 'block',
                marginBottom: 20,
              }}>
                Services
              </span>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                {SERVICE_LINKS.map((label, i) => (
                  <a
                    key={i}
                    href="#services"
                    style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 9,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                display: 'block',
                marginBottom: 20,
              }}>
                Contact
              </span>
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 2,
              }}>
                <a
                  href="tel:+33615963275"
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'block', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  06 15 96 32 75
                </a>
                <a
                  href="mailto:provencalcoastdriver@gmail.com"
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'block', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  provencalcoastdriver@gmail.com
                </a>
                <span style={{ display: 'block' }}>
                  82 av. Henri Mauriat, 13100 Aix-en-Provence
                </span>
                <span style={{ display: 'block', marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                  Disponible 24h/24, 7j/7
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
            }}>
              Provençal Coast Taxi &copy; {new Date().getFullYear()} — Licence VTC N°013230073 — Mentions légales — Politique de confidentialité
            </span>
          </div>
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
          }
          @media (max-width: 640px) {
            .trust-item + .trust-item {
              border-top: 1px solid var(--border);
              padding-top: 24px;
            }
          }
        `}</style>
      </footer>
    </>
  )
}
