import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhoneCall, List, X, ArrowRight } from '@phosphor-icons/react'
import { CONTACT, NAV_LINKS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const navRef = useRef(null)
  const drawerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(true)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3, clearProps: 'transform' }
    )
  }, [])

  useEffect(() => {
    // Reset scroll state on route change
    setScrolled(false)
    setOnDark(true)
  }, [location.pathname])

  useEffect(() => {
    const hero = document.querySelector('#hero') || document.querySelector('#hero-alt') || document.querySelector('.page-hero')
    if (!hero) return
    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'bottom top+=72',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
    return () => st.kill()
  }, [location.pathname])

  useEffect(() => {
    const darkSections = document.querySelectorAll('#hero, #hero-alt, #partners, #experience, #chiffres, #devis, #avis-alt, .page-hero')
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
  }, [location.pathname])

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

  const textColor = scrolled ? 'var(--texte)' : (onDark ? '#FFFFFF' : 'var(--texte)')
  const linkColor = 'var(--olive)'
  const linkHover = 'var(--texte)'

  const linkStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.06em',
    color: linkColor,
    textDecoration: 'none',
    transition: 'color 0.3s',
    position: 'relative',
  }

  // Renders anchor link or page Link depending on type
  function NavLink({ item, onClick, inDrawer = false }) {
    const isActive = !item.anchor && location.pathname === item.href
    const drawerColor = isActive ? 'var(--olive)' : 'var(--texte)'
    const drawerHover = 'var(--olive)'
    const style = {
      ...linkStyle,
      color: inDrawer
        ? drawerColor
        : (isActive ? (scrolled ? 'var(--olive)' : (onDark ? '#FFFFFF' : 'var(--olive)')) : linkColor),
      fontSize: inDrawer ? '16px' : linkStyle.fontSize,
      fontWeight: inDrawer ? (isActive ? 600 : 400) : linkStyle.fontWeight,
    }
    const hoverC = inDrawer ? drawerHover : linkHover
    const leaveC = inDrawer ? drawerColor : (isActive ? style.color : linkColor)
    if (item.anchor) {
      return (
        <a
          href={item.href}
          className="nav-link"
          style={style}
          onClick={onClick}
          onMouseEnter={e => (e.currentTarget.style.color = hoverC)}
          onMouseLeave={e => (e.currentTarget.style.color = leaveC)}
        >
          {item.label}
        </a>
      )
    }
    return (
      <Link
        to={item.href}
        className="nav-link"
        style={style}
        onClick={onClick}
        onMouseEnter={e => (e.currentTarget.style.color = hoverC)}
        onMouseLeave={e => (e.currentTarget.style.color = leaveC)}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{ borderBottom: '1px solid transparent', backgroundColor: 'transparent' }}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="flex items-center justify-between" style={{ height: 'clamp(64px, 8vw, 72px)' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 400,
              color: textColor,
              letterSpacing: '0.02em',
              transition: 'color 0.3s',
              lineHeight: 1.1,
            }}>
              Taxis Provençale Aix
            </span>
          </Link>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Droite : CTA + Téléphone */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={CONTACT.telHref}
              className="flex items-center gap-2"
              style={{
                color: scrolled ? 'var(--olive)' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              <PhoneCall size={16} weight="light" />
              <span className="font-serif" style={{ fontSize: '15px' }}>{CONTACT.tel}</span>
            </a>

            <Link
              to="/contact"
              className="flex items-center gap-2"
              style={{
                backgroundColor: scrolled ? 'var(--olive)' : 'transparent',
                border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                padding: '12px 24px',
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
              Calculer mon trajet
              <ArrowRight size={14} weight="regular" />
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden"
            onClick={() => (open ? closeDrawer() : setOpen(true))}
            aria-label="Menu"
            aria-expanded={open}
            style={{ color: textColor, transition: 'color 0.3s', cursor: 'pointer', minWidth: 48, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none' }}
          >
            {open
              ? <X size={24} weight="light" />
              : <List size={24} weight="light" />
            }
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div
          ref={drawerRef}
          className="md:hidden overflow-hidden"
          style={{ backgroundColor: 'var(--cream)', willChange: 'height' }}
        >
          <div className="px-6 pb-8 pt-4 flex flex-col gap-0">
            {NAV_LINKS.map((item) => (
              <div key={item.href} style={{ minHeight: 48, display: 'flex', alignItems: 'center' }}>
                <NavLink item={item} onClick={handleLinkClick} inDrawer />
              </div>
            ))}

            <a
              href={CONTACT.telHref}
              className="flex items-center gap-3"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '18px',
                color: 'var(--olive)',
                textDecoration: 'none',
                minHeight: 48,
              }}
            >
              <PhoneCall size={18} weight="light" />
              {CONTACT.tel}
            </a>

            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--olive)',
                color: '#FFFFFF',
                padding: '16px 32px',
                fontFamily: "'Sora', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Calculer mon trajet
              <ArrowRight size={14} weight="regular" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
