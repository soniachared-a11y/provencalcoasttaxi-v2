// Helpers GSAP réutilisables — Provençal Coast Taxi V2
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fade + remontée au scroll
export function fadeUp(el, options = {}) {
  return gsap.from(el, {
    y: options.y ?? 60,
    opacity: 0,
    duration: options.duration ?? 1,
    ease: options.ease ?? 'power3.out',
    delay: options.delay ?? 0,
    scrollTrigger: {
      trigger: options.trigger ?? el,
      start: options.start ?? 'top 85%',
      once: true,
    },
  })
}

// Stagger — grilles de cards
export function staggerReveal(els, triggerEl, options = {}) {
  return gsap.from(els, {
    y: options.y ?? 40,
    opacity: 0,
    duration: options.duration ?? 0.8,
    stagger: options.stagger ?? 0.12,
    ease: options.ease ?? 'power2.out',
    scrollTrigger: {
      trigger: triggerEl,
      start: options.start ?? 'top 80%',
      once: true,
    },
  })
}

// Parallax scrub (éléments décoratifs)
export function parallax(el, options = {}) {
  return gsap.to(el, {
    yPercent: options.yPercent ?? -20,
    ease: 'none',
    scrollTrigger: {
      trigger: options.trigger ?? el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: options.scrub ?? true,
    },
  })
}

// Text reveal — mot par mot
export function textReveal(el, options = {}) {
  const words = el.querySelectorAll('.word')
  return gsap.from(words, {
    y: '100%',
    opacity: 0,
    duration: options.duration ?? 0.7,
    stagger: options.stagger ?? 0.08,
    ease: 'power3.out',
    delay: options.delay ?? 0,
  })
}

// Ligne décorative qui s'étire
export function lineExpand(el, options = {}) {
  return gsap.from(el, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: options.duration ?? 1.2,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: options.trigger ?? el,
      start: 'top 85%',
      once: true,
    },
  })
}
