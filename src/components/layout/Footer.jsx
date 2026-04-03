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
        scrollTrigger: { trigger: footerRef.current, start: 'top bottom', once: true },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} style={{ background: '#0D1117' }}>

      {/* ── CTA Band ── */}
      <div style={{
        background: 'var(--cream)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="ft-cta-band" style={{
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
              color: 'var(--texte)', textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--olive)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--texte)'}
            >
              {CONTACT.tel}
            </a>
          </div>
          <div className="ft-cta-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
              background: 'transparent', color: 'var(--texte)',
              border: '1px solid var(--border)',
              padding: '14px 28px', borderRadius: 2,
              fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = '#25D366' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--texte)' }}
            >
              <WhatsappLogo size={16} weight="fill" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="ft-main-grid" style={{
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            {[
              { icon: ShieldCheck, text: 'Licence VTC officielle' },
              { icon: Clock, text: 'Disponible 24h/24, 7j/7' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={18} weight="duotone" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Payment badges premium */}
          <div className="ft-payment">
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: 14,
          }}>
            Paiement accepté
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {/* Visa */}
            <div style={{
              width: 52, height: 34, borderRadius: 4,
              background: 'linear-gradient(135deg, #1A1F71 0%, #2B3FAE 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path d="M12.3 0.5L8.1 11.5H5.4L3.4 2.7C3.3 2.2 3.1 2 2.7 1.8C2 1.4 0.9 1.1 0 0.9L0.1 0.5H4.4C4.9 0.5 5.4 0.9 5.5 1.5L6.5 7.1L9.1 0.5H12.3ZM22.2 7.8C22.2 4.8 18 4.6 18 3.3C18 2.9 18.4 2.5 19.2 2.4C19.6 2.3 20.7 2.3 21.9 2.8L22.4 0.8C21.8 0.6 21 0.4 20 0.4C17 0.4 14.9 2 14.9 4.2C14.9 5.8 16.3 6.7 17.4 7.3C18.5 7.8 18.9 8.2 18.8 8.7C18.8 9.5 17.9 9.8 17 9.8C15.7 9.8 14.9 9.5 14.3 9.2L13.8 11.2C14.4 11.5 15.5 11.7 16.7 11.7C19.9 11.7 22.2 10.1 22.2 7.8ZM29.3 11.5H31.7L29.6 0.5H27.4C27 0.5 26.6 0.7 26.4 1.1L22.1 11.5H25.3L25.9 9.8H29.8L29.3 11.5ZM26.7 7.4L28.3 3L29.2 7.4H26.7Z" fill="#fff"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div style={{
              width: 52, height: 34, borderRadius: 4,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <svg width="30" height="18" viewBox="0 0 30 18" fill="none">
                <circle cx="11" cy="9" r="8" fill="#EB001B" opacity="0.9"/>
                <circle cx="19" cy="9" r="8" fill="#F79E1B" opacity="0.9"/>
                <path d="M15 2.8C16.7 4.1 17.8 6.1 17.8 8.5C17.8 10.9 16.7 12.9 15 14.2C13.3 12.9 12.2 10.9 12.2 8.5C12.2 6.1 13.3 4.1 15 2.8Z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* Amex */}
            <div style={{
              width: 52, height: 34, borderRadius: 4,
              background: 'linear-gradient(135deg, #006FCF 0%, #0050A5 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <span style={{
                fontFamily: 'Sora, sans-serif', fontSize: 7, fontWeight: 800,
                color: '#fff', letterSpacing: '0.08em',
              }}>AMEX</span>
            </div>
            {/* Apple Pay */}
            <div style={{
              width: 52, height: 34, borderRadius: 4,
              background: 'linear-gradient(135deg, #111 0%, #333 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
                <path d="M5.2 1.6C4.9 2 4.4 2.3 3.9 2.3C3.8 1.8 4 1.3 4.3 0.9C4.6 0.5 5.1 0.2 5.5 0.1C5.6 0.6 5.5 1.2 5.2 1.6ZM5.5 2.4C4.8 2.4 4.2 2.8 3.8 2.8C3.4 2.8 2.9 2.5 2.3 2.5C1.4 2.5 0.5 3.1 0.1 4C-0.8 5.8 0 8.6 0.9 10C1.3 10.7 1.8 11.5 2.5 11.5C3.1 11.5 3.3 11.1 4 11.1C4.7 11.1 4.9 11.5 5.6 11.5C6.2 11.5 6.7 10.8 7.1 10.1C7.3 9.6 7.5 9.2 7.6 8.9C7.5 8.9 6.2 8.4 6.2 6.8C6.2 5.5 7.2 4.8 7.3 4.8C6.7 3.8 5.8 2.5 5.5 2.4Z" fill="#fff"/>
                <path d="M11.8 0.4C14 0.4 15.5 1.9 15.5 4.2C15.5 6.4 14 8 11.7 8H9.8V11.4H8.2V0.4H11.8ZM9.8 6.7H11.4C12.9 6.7 13.8 5.8 13.8 4.2C13.8 2.6 12.9 1.7 11.4 1.7H9.8V6.7ZM16 8.8C16 7.2 17.2 6.2 19.3 6.1L21.5 6V5.3C21.5 4.3 20.8 3.7 19.7 3.7C18.7 3.7 18 4.2 17.9 5H16.4C16.5 3.4 17.8 2.4 19.7 2.4C21.7 2.4 23 3.4 23 5.1V11.4H21.5V10.1C21 10.9 20 11.5 18.8 11.5C17.1 11.5 16 10.5 16 8.8ZM21.5 8.1V7.2L19.6 7.3C18.4 7.4 17.6 7.9 17.6 8.7C17.6 9.5 18.3 10.1 19.3 10.1C20.6 10.1 21.5 9.3 21.5 8.1ZM24.2 14.4V13.2C24.4 13.2 24.7 13.2 24.9 13.2C25.7 13.2 26.2 12.8 26.5 11.9L26.6 11.5L23.5 2.6H25.2L27.4 10L27.4 10L28 2.6" fill="#fff"/>
              </svg>
            </div>
            {/* Espèces */}
            <div style={{
              width: 52, height: 34, borderRadius: 4,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              <CreditCard size={14} weight="duotone" style={{ color: 'rgba(255,255,255,0.5)', marginRight: 3 }} />
              <span style={{
                fontFamily: 'Sora, sans-serif', fontSize: 7, fontWeight: 700,
                color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em',
              }}>CASH</span>
            </div>
          </div>
          </div>{/* end ft-payment */}
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
        <div className="ft-bottom" style={{
          maxWidth: 1200, margin: '0 auto', padding: '20px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Provençal Coast Taxi — Licence VTC {CONTACT.licence}
          </span>
          <div className="ft-bottom-links" style={{ display: 'flex', gap: 24 }}>
            <Link to="/mentions-legales" style={{
              fontFamily: 'Sora, sans-serif', fontSize: 11,
              color: 'rgba(255,255,255,0.2)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >
              Mentions légales
            </Link>
            {['Confidentialité', 'CGV'].map((label, i) => (
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

      {/* Responsive */}
      <style>{`
        /* Tablet */
        @media (max-width: 900px) {
          .ft-cta-band { padding: 32px 24px !important; }
          .ft-cta-band > div:first-child { margin-bottom: 0; }
          .ft-main-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px 28px !important;
            padding: 48px 24px !important;
          }
          .ft-col:first-child { grid-column: 1 / -1; }
          .ft-bottom { padding: 16px 24px !important; }
        }
        /* Mobile */
        @media (max-width: 600px) {
          .ft-cta-band {
            padding: 24px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .ft-cta-band > div:first-child a {
            font-size: clamp(22px, 6vw, 30px) !important;
          }
          .ft-cta-btns {
            width: 100%;
            flex-direction: column !important;
          }
          .ft-cta-btns > a {
            justify-content: center !important;
          }
          .ft-main-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 20px !important;
            padding: 32px 20px !important;
          }
          .ft-col:first-child { grid-column: 1 / -1; }
          .ft-col:first-child p { display: none; }
          .ft-payment { display: none !important; }
          .ft-bottom {
            padding: 14px 20px !important;
            flex-direction: column !important;
            gap: 8px !important;
            align-items: flex-start !important;
          }
          .ft-bottom-links { flex-wrap: wrap !important; gap: 12px !important; }
        }
      `}</style>
    </footer>
  )
}
