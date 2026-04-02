import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import { CONTACT, NAV_LINKS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const navRef = useRef(null)
  const drawerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(true) // Start on hero (dark)

  // Entrée animée — fromTo pour éviter le bug opacity:0 bloqué
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3, clearProps: 'transform' }
    )
  }, [])

  // Changement de fond au scroll — via ScrollTrigger pour Lenis compat
  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero) return
    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'bottom top+=72',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
    return () => st.kill()
  }, [])

  // Couleur contextuelle — détecter les sections dark
  useEffect(() => {
    const darkSections = document.querySelectorAll('#hero, #hero-alt, #partners, #experience, #chiffres, #devis, #avis-alt')
    const triggers = []
    darkSections.forEach(section => {
      if (!section) return
      triggers.push(ScrollTrigger.create({
        trigger: section,
        start: 'top top+=72',
        end: 'bottom top+=72',
        onEnter: () => setOnDark(true),
        onLeave: () => setOnDark(false),
        onEnterBack: () => setOnDark(true),
        onLeaveBack: () => setOnDark(false),
      }))
    })
    return () => triggers.forEach(t => t.kill())
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    if (scrolled) {
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(246,243,238,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottomColor: '#E8E4DE',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        duration: 0.3,
      })
    } else {
      gsap.to(navRef.current, {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        borderBottomColor: 'transparent',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 0.3,
      })
    }
  }, [scrolled])

  // Drawer mobile animation
  useEffect(() => {
    if (!drawerRef.current) return
    if (open) {
      gsap.fromTo(
        drawerRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' },
      )
    }
  }, [open])

  const closeDrawer = () => {
    if (!drawerRef.current) return
    gsap.to(drawerRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setOpen(false),
    })
  }

  const handleLinkClick = () => {
    if (open) closeDrawer()
  }

  // Couleurs contextuelles — adapte la nav aux sections dark/light
  const isDark = !scrolled || onDark
  const textColor = scrolled && !onDark ? 'var(--texte)' : '#FFFFFF'
  const linkColor = scrolled && !onDark ? 'var(--texte-light)' : 'rgba(255,255,255,0.5)'
  const linkHover = scrolled && !onDark ? 'var(--texte)' : '#FFFFFF'

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        borderBottom: '1px solid transparent',
        backgroundColor: 'transparent',
      }}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        {/* Bar principale */}
        <div
          className="flex items-center justify-between"
          style={{ height: 'clamp(64px, 8vw, 72px)' }}
        >
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/logo.png"
              alt="Provençal Coast"
              style={{
                height: 'clamp(36px, 5vw, 48px)',
                width: 'auto',
                display: 'block',
                filter: scrolled && !onDark ? 'none' : 'brightness(0) invert(1)',
                transition: 'filter 0.3s',
              }}
            />
          </a>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  color: linkColor,
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Droite : CTA + Téléphone */}
          <div className="hidden md:flex items-center gap-6">
            {/* Téléphone */}
            <a
              href={CONTACT.telHref}
              className="flex items-center gap-2"
              style={{
                color: scrolled ? 'var(--olive)' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              <Phone size={16} strokeWidth={1.5} />
              <span
                className="font-serif"
                style={{ fontSize: '15px' }}
              >
                {CONTACT.tel}
              </span>
            </a>

            {/* CTA Réserver */}
            <a
              href="#contact"
              className="flex items-center gap-2"
              style={{
                backgroundColor: scrolled ? 'var(--olive)' : 'transparent',
                border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '0px',
                fontFamily: "'Sora', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = scrolled ? '#5A6B3A' : 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = scrolled ? 'var(--olive)' : 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Réserver
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden"
            onClick={() => (open ? closeDrawer() : setOpen(true))}
            aria-label="Menu"
            aria-expanded={open}
            style={{ color: textColor, transition: 'color 0.3s' }}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div
          ref={drawerRef}
          className="md:hidden overflow-hidden"
          style={{ backgroundColor: 'var(--cream)' }}
        >
          <div className="px-6 pb-8 pt-4 flex flex-col gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleLinkClick}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--texte)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}

            {/* Téléphone mobile */}
            <a
              href={CONTACT.telHref}
              className="flex items-center gap-3"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '18px',
                color: 'var(--olive)',
                textDecoration: 'none',
              }}
            >
              <Phone size={18} strokeWidth={1.5} />
              {CONTACT.tel}
            </a>

            {/* CTA mobile */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--olive)',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '0px',
                fontFamily: "'Sora', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Réserver
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
