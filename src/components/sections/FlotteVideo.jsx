// FlotteVideo.jsx — Section vidéo plein écran + CTAs hero
// Véhicules détourés positionnés à CHEVAL entre cette section et la suivante

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Phone } from '@phosphor-icons/react'
import { CONTACT } from '../../data/content'

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
          <track kind="captions" />
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

        {/* CTAs */}
        <div
          className="fv-btn fv-mini-form"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/contact"
            style={{
              background: 'var(--olive)',
              color: '#fff',
              fontFamily: 'Sora, sans-serif',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '16px 32px',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none',
              transition: 'background 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5A6B3A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--olive)' }}
          >
            Réserver <ArrowRight size={14} weight="bold" />
          </Link>
          <a
            href={CONTACT.telHref}
            style={{
              background: 'rgba(246,243,238,0.08)',
              border: '1px solid rgba(246,243,238,0.2)',
              color: '#fff',
              fontFamily: 'Sora, sans-serif',
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '16px 28px',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none',
              transition: 'background 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(246,243,238,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(246,243,238,0.08)' }}
          >
            <Phone size={14} weight="light" /> {CONTACT.tel}
          </a>
        </div>
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
          width={600}
          height={400}
          loading="lazy"
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
          width={600}
          height={400}
          loading="lazy"
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
        @media (min-width: 769px) {
          .fv-section { min-height: 100vh !important; height: auto !important; align-items: center !important; }
          .fv-content-desktop { padding: 0 24px !important; }
        }
        @media (max-width: 768px) {
          .fv-section {
            min-height: 100dvh !important;
            height: auto !important;
            align-items: flex-start !important;
          }
          .fv-content-desktop {
            padding: 90px 20px 40px 20px !important;
            margin-bottom: 180px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .fv-content-desktop h2 {
            font-size: clamp(30px, 8vw, 42px) !important;
          }
          .fv-mini-form {
            flex-direction: column !important;
            max-width: 100% !important;
          }
          .fv-mini-form > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(246,243,238,0.12) !important;
            flex: none !important;
            width: 100% !important;
          }
          .fv-mini-form input[type="date"],
          .fv-mini-form input[type="time"] {
            width: 100% !important;
          }
          .fv-form-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .fv-form-actions button[type="submit"],
          .fv-form-actions a {
            width: 100% !important;
            height: 52px !important;
            justify-content: center !important;
            border-right: none !important;
          }
          .fv-form-actions button[type="submit"] {
            border-bottom: 1px solid rgba(246,243,238,0.12) !important;
          }
          .fv-vehicles { width: 100% !important; max-width: 100% !important; bottom: -70px !important; }
          .fv-van { margin-right: -30px !important; height: 200px !important; }
          .fv-berline { height: 155px !important; }
        }
      `}</style>
    </section>
  )
}
