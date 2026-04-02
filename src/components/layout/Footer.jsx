import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, CreditCard, Clock, Mail, Phone, MessageCircle, Twitter, Instagram } from 'lucide-react'
import { CONTACT, TRUST } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const SERVICE_LINKS = [
  'Transfert Aéroport',
  'Déplacement Affaires',
  'Événements & Soirées',
  'Longue Distance',
  'Visite Touristique',
]

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Flotte', href: '#flotte' },
  { label: 'Zones', href: '#zones' },
  { label: 'Avis', href: '#avis' },
  { label: 'Contact', href: '#contact' },
]

const ICON_MAP = { Shield, CreditCard, Clock }

export default function Footer() {
  const footerRef = useRef(null)
  const trustRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        y: 30,
        opacity: 0,
        duration: 0.7,
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

  const linkStyle = {
    fontFamily: 'Sora, sans-serif',
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    display: 'block',
  }

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
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--texte)', marginBottom: 4 }}>
                  {item.titre}
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'var(--texte-light)' }}>
                  {item.desc}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer principal */}
      <footer ref={footerRef} style={{
        background: '#0D1117',
        padding: '64px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Logo centré — grand */}
        <div style={{
          textAlign: 'center',
          paddingBottom: 48,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <img
            src="/images/logo.png"
            alt="Provençal Coast Taxi"
            style={{
              height: 'clamp(80px, 12vw, 140px)',
              width: 'auto',
              display: 'inline-block',
            }}
          />
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 16,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Chauffeur privé · Aix-en-Provence · 24h/24
          </p>
        </div>

        {/* Bande contact avec icônes */}
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '48px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Email */}
          <div className="footer-col">
            <Mail size={22} strokeWidth={1.3} style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 12 }} />
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
              Email
            </div>
            <a href={`mailto:${CONTACT.email}`} style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
              {CONTACT.email}
            </a>
          </div>

          {/* Téléphone */}
          <div className="footer-col" style={{ borderLeft: '1px solid rgba(255,255,255,0.07)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            <Phone size={22} strokeWidth={1.3} style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 12 }} />
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
              Téléphone
            </div>
            <a href={CONTACT.telHref} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}>
              {CONTACT.tel}
            </a>
          </div>

          {/* Réseaux sociaux */}
          <div className="footer-col">
            <MessageCircle size={22} strokeWidth={1.3} style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 12 }} />
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
              Réseaux sociaux
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {[Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 3 colonnes — Desc / Navigation / Paiement */}
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '48px 24px',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gap: 48,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Col 1 — Description */}
          <div className="footer-col">
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 16 }}>
              Provençal Coast Taxi
            </span>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: '0 0 20px' }}>
              Votre chauffeur privé Mercedes à Aix-en-Provence. Plus de 10 ans d'expérience, disponible 24h/24 pour particuliers et professionnels.
            </p>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              {CONTACT.adresse}
            </p>
          </div>

          {/* Col 2 — Services */}
          <div className="footer-col">
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 16 }}>
              Services
            </span>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICE_LINKS.map((label, i) => (
                <a key={i} href="#services" style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Paiement & confiance */}
          <div className="footer-col">
            <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 16 }}>
              Réservez &amp; payez à bord
            </span>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 20px' }}>
              Paiement de la totalité de la course directement au chauffeur.
            </p>
            {/* Badges paiement */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['VISA', 'Mastercard', 'Amex', 'Espèces'].map((label, i) => (
                <span key={i} style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: i < 3 ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: i === 0 ? '#1A56DB' : i === 1 ? '#EB5757' : i === 2 ? '#2D9CDB' : 'rgba(255,255,255,0.08)',
                  padding: '6px 14px',
                  borderRadius: 4,
                  border: i === 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                }}>
                  {label}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={14} strokeWidth={1.5} style={{ color: 'var(--lavande)' }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                Paiement sécurisé · Tarifs fixes garantis
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '24px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Provençal Coast Taxi — Licence VTC {CONTACT.licence}
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Mentions légales', 'Politique de confidentialité'].map((label, i) => (
              <a key={i} href="#" style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 768px) {
            .footer-contact-grid { grid-template-columns: 1fr !important; }
            .footer-bottom-grid { grid-template-columns: 1fr !important; }
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
