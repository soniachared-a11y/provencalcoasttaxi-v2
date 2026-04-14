import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  TbPhone, TbMail, TbMapPin,
  TbBrandInstagram, TbBrandFacebook,
  TbShieldCheck, TbClock24, TbCash,
} from 'react-icons/tb'
import { SiVisa, SiMastercard, SiAmericanexpress, SiApplepay } from 'react-icons/si'
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
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          once: true,
          invalidateOnRefresh: true,
        },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} style={{
      background: '#0D1117',
      position: 'relative',
      zIndex: 5,
      boxShadow: '0 -24px 80px rgba(0,0,0,0.75)',
    }}>

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
              <TbPhone size={16} strokeWidth={2} />
              Appeler
            </a>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent', color: 'var(--texte)',
              border: '1px solid var(--border)',
              padding: '14px 28px', borderRadius: 2,
              fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--olive)'; e.currentTarget.style.color = 'var(--olive)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--texte)' }}
            >
              <TbMail size={16} strokeWidth={2} />
              Formulaire
            </Link>
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
            Taxis Provençale Aix
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
              { icon: TbShieldCheck, text: 'Licence VTC officielle' },
              { icon: TbClock24, text: 'Disponible 24h/24, 7j/7' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={18} strokeWidth={1.8} style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Payment badges — minimaliste & moderne */}
          <div className="ft-payment">
            <span style={{
              fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: 14,
            }}>
              Paiement accepté
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { Icon: SiVisa, label: 'Visa', size: 34 },
                { Icon: SiMastercard, label: 'Mastercard', size: 26 },
                { Icon: SiAmericanexpress, label: 'American Express', size: 24 },
                { Icon: SiApplepay, label: 'Apple Pay', size: 32 },
              ].map(({ Icon, label, size }, i) => (
                <div
                  key={i}
                  aria-label={label}
                  title={label}
                  style={{
                    width: 54, height: 34, borderRadius: 4,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon size={size} style={{ color: 'rgba(255,255,255,0.75)' }} />
                </div>
              ))}
              {/* Espèces */}
              <div
                aria-label="Espèces"
                title="Espèces"
                style={{
                  height: 34, padding: '0 10px', borderRadius: 4,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
              >
                <TbCash size={16} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.75)' }} />
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
                  color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em',
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
              <TbMail size={18} strokeWidth={1.8} style={{ color: 'var(--lavande)', flexShrink: 0 }} />
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
              <TbPhone size={18} strokeWidth={1.8} style={{ color: 'var(--lavande)', flexShrink: 0 }} />
              {CONTACT.tel}
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <TbMapPin size={18} strokeWidth={1.8} style={{ color: 'var(--lavande)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                {CONTACT.adresse}
              </span>
            </div>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            {[
              { Icon: TbBrandInstagram, label: 'Instagram' },
              { Icon: TbBrandFacebook, label: 'Facebook' },
            ].map(({ Icon, label, href }, i) => (
              <a key={i} href={href || '#'} aria-label={label}
                target={href ? '_blank' : undefined} rel={href ? 'noopener noreferrer' : undefined}
                style={{
                  width: 40, height: 40, borderRadius: 4,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >
                <Icon size={20} strokeWidth={1.8} />
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
            © {new Date().getFullYear()} Taxis Provençale Aix — Licence VTC {CONTACT.licence}
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

        {/* Crédit Pertinentia — discret */}
        <div className="ft-credit" style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '12px 40px 20px',
          display: 'flex', justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          <a
            href="https://pertinentia.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
              textDecoration: 'none',
              transition: 'color 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--lavande)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
          >
            Créé par <span style={{ fontStyle: 'italic', fontWeight: 500 }}>pertinentia.fr</span>
          </a>
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
          .ft-credit { padding: 12px 24px 20px !important; }
        }
        /* Mobile */
        @media (max-width: 600px) {
          .ft-cta-band {
            padding: 22px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
          .ft-cta-band > div:first-child a {
            font-size: clamp(22px, 6vw, 30px) !important;
          }
          .ft-cta-btns {
            width: 100%;
            flex-direction: row !important;
            gap: 10px !important;
          }
          .ft-cta-btns > a {
            flex: 1;
            justify-content: center !important;
            padding: 12px 14px !important;
            font-size: 10px !important;
          }
          .ft-main-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 20px !important;
            padding: 32px 24px !important;
          }
          /* Col 1 Marque — full width, compacte */
          .ft-col:nth-child(1) { grid-column: 1 / -1; }
          .ft-col:nth-child(1) p {
            display: block !important;
            font-size: 12px !important;
            line-height: 1.7 !important;
            margin-bottom: 18px !important;
          }
          .ft-col:nth-child(1) > div:nth-of-type(1) {
            margin-bottom: 18px !important;
            gap: 10px !important;
          }
          /* Col 2 Navigation + Col 3 Services — côte à côte */
          /* Col 4 Contact — full width en bas */
          .ft-col:nth-child(4) {
            grid-column: 1 / -1;
            margin-top: 4px;
          }
          .ft-col:nth-child(4) > div:first-of-type {
            gap: 14px !important;
          }
          .ft-col:nth-child(4) > div:last-child {
            margin-top: 18px !important;
          }
          .ft-payment {
            display: block !important;
            margin-top: 4px;
          }
          .ft-payment > div:last-child {
            gap: 6px !important;
          }
          .ft-payment > div:last-child > div {
            width: 44px !important;
            height: 28px !important;
          }
          .ft-bottom {
            padding: 14px 24px !important;
            flex-direction: column !important;
            gap: 8px !important;
            align-items: center !important;
            text-align: center;
          }
          .ft-bottom > span {
            text-align: center;
            font-size: 10px !important;
          }
          .ft-bottom-links {
            flex-wrap: wrap !important;
            gap: 12px !important;
            justify-content: center;
          }
          .ft-bottom-links a { font-size: 10px !important; }
          .ft-credit { padding: 12px 24px 18px !important; }
        }
      `}</style>
    </footer>
  )
}
