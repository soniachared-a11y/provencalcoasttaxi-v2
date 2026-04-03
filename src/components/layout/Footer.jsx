import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone, Envelope, WhatsappLogo, MapPin,
  InstagramLogo, FacebookLogo,
  ShieldCheck, CreditCard, Clock,
  ArrowRight,
} from '@phosphor-icons/react'
import { CONTACT, NAV_LINKS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const FOOTER_NAV = [
  { label: 'Services', to: '/services' },
  { label: 'Flotte', to: '/flotte' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

const SERVICES_NAV = [
  { label: 'Transfert Aéroport', to: '/services' },
  { label: 'Déplacement Affaires', to: '/services' },
  { label: 'Événements & Soirées', to: '/services' },
  { label: 'Longue Distance', to: '/services' },
  { label: 'Visite Touristique', to: '/services' },
]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ft-col', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} style={{ background: '#0D1117' }}>

      {/* ── CTA Band ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '44px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <span style={{
              fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--lavande)', display: 'block', marginBottom: 10,
            }}>
              Réservation immédiate
            </span>
            <a href={CONTACT.telHref} style={{
              fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 40px)',
              color: '#fff', textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--lavande)'}
              onMouseLeave={e => e.currentTarget.style.color = '#fff'}
            >
              {CONTACT.tel}
            </a>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={CONTACT.telHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--olive)', color: '#fff',
              padding: '14px 28px', borderRadius: 2,
              fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#5A6B3A'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--olive)'}
            >
              <Phone size={16} weight="fill" />
              Appeler
            </a>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '14px 28px', borderRadius: 2,
              fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = '#25D366' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff' }}
            >
              <WhatsappLogo size={16} weight="fill" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '64px 40px',
        display: 'grid', gridTemplateColumns: '1.6fr 0.8fr 1fr 1.2fr',
        gap: 56,
      }}>

        {/* Col 1 — Marque */}
        <div className="ft-col">
          <span style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 22,
            color: '#fff', display: 'block', marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>
            Provençal Coast Taxi
          </span>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 13,
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
            margin: '0 0 28px',
          }}>
            Chauffeur privé Mercedes à Aix-en-Provence. Plus de 10 ans d'expérience,
            disponible 24h/24 pour particuliers et professionnels.
          </p>
          {/* Garanties */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: ShieldCheck, text: 'Licence VTC officielle' },
              { icon: Clock, text: 'Disponible 24h/24, 7j/7' },
              { icon: CreditCard, text: 'CB, espèces, virement' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={18} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div className="ft-col">
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 24,
          }}>
            Navigation
          </span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FOOTER_NAV.map((item, i) => (
              <Link key={i} to={item.to} style={{
                fontFamily: 'Sora, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                transition: 'color 0.3s, padding-left 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.paddingLeft = '6px' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3 — Services */}
        <div className="ft-col">
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 24,
          }}>
            Services
          </span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SERVICES_NAV.map((item, i) => (
              <Link key={i} to={item.to} style={{
                fontFamily: 'Sora, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                transition: 'color 0.3s, padding-left 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.paddingLeft = '6px' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 4 — Contact */}
        <div className="ft-col">
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 24,
          }}>
            Contact
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <a href={`mailto:${CONTACT.email}`} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Sora, sans-serif', fontSize: 13,
              color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              <Envelope size={18} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
              {CONTACT.email}
            </a>
            <a href={CONTACT.telHref} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Sora, sans-serif', fontSize: 13,
              color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              <Phone size={18} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
              {CONTACT.tel}
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <MapPin size={18} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                {CONTACT.adresse}
              </span>
            </div>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            {[
              { Icon: InstagramLogo, label: 'Instagram' },
              { Icon: FacebookLogo, label: 'Facebook' },
              { Icon: WhatsappLogo, label: 'WhatsApp', href: CONTACT.whatsappHref },
            ].map(({ Icon, label, href }, i) => (
              <a key={i} href={href || '#'} aria-label={label}
                target={href ? '_blank' : undefined} rel={href ? 'noopener noreferrer' : undefined}
                style={{
                  width: 40, height: 40, borderRadius: 4,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
              >
                <Icon size={20} weight="fill" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '20px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Provençal Coast Taxi — Licence VTC {CONTACT.licence}
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Mentions légales', 'Confidentialité', 'CGV'].map((label, i) => (
              <a key={i} href="#" style={{
                fontFamily: 'Sora, sans-serif', fontSize: 11,
                color: 'rgba(255,255,255,0.2)', textDecoration: 'none',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 900px) {
          footer > div:nth-child(2) > div {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          footer > div:nth-child(2) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
