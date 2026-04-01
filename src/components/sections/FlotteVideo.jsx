// FlotteVideo.jsx — Section vidéo plein écran + mini calculateur hero
// Véhicules détourés positionnés à CHEVAL entre cette section et la suivante

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function FlotteVideo() {
  const sectionRef = useRef(null)

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
        <form
          className="fv-btn fv-mini-form"
          onSubmit={e => e.preventDefault()}
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
          }}
        >
          {/* Départ */}
          <div style={{ flex: 1, position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)' }}>
            <label style={{
              position: 'absolute', top: 10, left: 16,
              fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'var(--olive)',
            }}>Départ</label>
            <input
              type="text"
              placeholder="Adresse de départ"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#F6F3EE', fontFamily: 'Sora, sans-serif', fontSize: 13,
                padding: '34px 40px 12px 16px', width: '100%',
              }}
              onFocus={e => (e.currentTarget.parentElement.style.background = 'rgba(246,243,238,0.05)')}
              onBlur={e => (e.currentTarget.parentElement.style.background = 'transparent')}
            />
            <MapPin size={14} strokeWidth={1.5} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--olive)', pointerEvents: 'none',
            }} />
          </div>

          {/* Arrivée */}
          <div style={{ flex: 1, position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)' }}>
            <label style={{
              position: 'absolute', top: 10, left: 16,
              fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'var(--olive)',
            }}>Arrivée</label>
            <input
              type="text"
              placeholder="Adresse d'arrivée"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#F6F3EE', fontFamily: 'Sora, sans-serif', fontSize: 13,
                padding: '34px 40px 12px 16px', width: '100%',
              }}
              onFocus={e => (e.currentTarget.parentElement.style.background = 'rgba(246,243,238,0.05)')}
              onBlur={e => (e.currentTarget.parentElement.style.background = 'transparent')}
            />
            <MapPin size={14} strokeWidth={1.5} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--olive)', pointerEvents: 'none',
            }} />
          </div>

          {/* Date */}
          <div style={{ flex: '0 0 160px', position: 'relative', borderRight: '1px solid rgba(246,243,238,0.12)' }}>
            <label style={{
              position: 'absolute', top: 10, left: 16,
              fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'var(--olive)',
            }}>Date</label>
            <input
              type="date"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#F6F3EE', fontFamily: 'Sora, sans-serif', fontSize: 13,
                padding: '34px 16px 12px 16px', width: '100%', colorScheme: 'dark',
              }}
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            style={{
              background: 'var(--olive)',
              border: 'none',
              color: '#fff',
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0 28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              transition: 'background 0.25s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5A6B3A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--olive)' }}
          >
            Calculer <ArrowRight size={14} strokeWidth={2} />
          </button>
        </form>
      </div>

      {/* Contenu mobile — repositionné en haut */}
      <div className="fv-content fv-content-mobile" style={{ display: 'none' }}>
        {/* Tag */}
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(246,243,238,0.55)',
          margin: '0 0 16px',
        }}>
          Chauffeur privé — Provence
        </p>

        <h2
          className="fv-title"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(32px, 9vw, 48px)',
            fontWeight: 400,
            color: '#F6F3EE',
            lineHeight: 1.1,
            margin: '0 0 28px',
          }}
        >
          Votre chauffeur<br />privé en Provence
        </h2>

        {/* CTA principal — olive, pleine largeur */}
        <a
          href="#devis"
          className="fv-btn"
          style={{
            display: 'block',
            fontFamily: 'Sora, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            background: 'var(--olive)',
            padding: '17px 24px',
            textDecoration: 'none',
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Calculer mon trajet →
        </a>

        {/* CTA secondaire — appel direct */}
        <a
          href="tel:+33600000000"
          style={{
            display: 'block',
            fontFamily: 'Sora, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(246,243,238,0.7)',
            textDecoration: 'none',
            textAlign: 'center',
            padding: '14px 24px',
            border: '1px solid rgba(246,243,238,0.2)',
          }}
        >
          Appeler maintenant
        </a>
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
        /* Desktop : reset complet */
        @media (min-width: 769px) {
          .fv-section { min-height: 100vh !important; height: auto !important; align-items: center !important; }
          .fv-content-desktop { display: block !important; }
          .fv-content-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .fv-section {
            height: 65dvh !important;
            min-height: unset !important;
            align-items: flex-start !important;
          }
          .fv-content-desktop { display: none !important; }
          .fv-content-mobile {
            display: block !important;
            position: relative;
            z-index: 3;
            padding: 80px 28px 0 28px;
            width: 100%;
            box-sizing: border-box;
          }
          .fv-vehicles { width: 100% !important; max-width: 100% !important; bottom: -70px !important; }
          .fv-van { margin-right: -30px !important; height: 200px !important; }
          .fv-berline { height: 155px !important; }
        }
      `}</style>
    </section>
  )
}
