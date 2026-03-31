// Hook global — Animations Awwwards appliquées à toute la page
// Parallaxe, image reveals, fade-ups, stagger grilles, compteurs
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations() {
  useEffect(() => {
    // Attendre que Lenis et tous les composants soient montés
    const timer = setTimeout(() => {
      initParallax()
      initImageReveals()
      initFadeUps()
      initStaggerGrids()
      initCounters()
      ScrollTrigger.refresh()
    }, 1200) // 1.2s après mount pour être sûr que Lenis est prêt

    return () => {
      clearTimeout(timer)
    }
  }, [])
}

// ── 2. PARALLAXE IMAGES ──────────────────────────────────
function initParallax() {
  // Toutes les images dans des conteneurs overflow:hidden
  // On cible les images avec la classe .parallax-img ou dans des conteneurs .parallax-wrap
  const images = document.querySelectorAll('.parallax-img, .flotte-image, .zones-bg-image')

  images.forEach(img => {
    // S'assurer que l'image est assez grande pour le mouvement
    if (!img.style.transform?.includes('scale')) {
      gsap.set(img, { scale: 1.2 })
    }

    gsap.to(img, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('section') || img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  })

  // Hero video/image parallax renforcé
  const heroMedia = document.querySelector('#hero video, #hero img')
  if (heroMedia) {
    gsap.to(heroMedia, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }
}

// ── 4. IMAGE REVEAL CLIP-PATH ────────────────────────────
function initImageReveals() {
  // Toutes les images principales qui ne sont pas déjà animées
  const images = document.querySelectorAll(
    '#about img:not([aria-hidden]), .flotte-image, #hero-alt img'
  )

  images.forEach(img => {
    // Vérifier que l'image n'a pas déjà un ScrollTrigger
    if (img.dataset.revealed) return
    img.dataset.revealed = 'true'

    gsap.fromTo(img,
      { clipPath: 'inset(30% 0% 0% 0%)', scale: 1.15 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  })
}

// ── 5. PARAGRAPHES FADE-UP ───────────────────────────────
function initFadeUps() {
  // Tous les paragraphes dans les sections principales
  const paragraphs = document.querySelectorAll(
    'section p, section .about-text > *, .contact-form label, .trust-item'
  )

  paragraphs.forEach(p => {
    if (p.dataset.fadeup) return
    p.dataset.fadeup = 'true'

    // Vérifier que l'élément est visible (pas déjà animé par un composant)
    const computed = getComputedStyle(p)
    if (computed.opacity === '0') return // Déjà géré par un autre ScrollTrigger

    gsap.fromTo(p,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  })
}

// ── 9. STAGGER GRILLES ───────────────────────────────────
function initStaggerGrids() {
  // Grilles identifiées par classe ou structure
  const grids = [
    { selector: '.atout-item', container: '#atouts' },
    { selector: '.flotte-item', container: '#flotte' },
    { selector: '.zones-item', container: '.zones-list' },
    { selector: '.trust-item', container: null },
  ]

  grids.forEach(({ selector, container }) => {
    const items = document.querySelectorAll(selector)
    if (items.length === 0) return

    // Vérifier qu'ils ne sont pas déjà animés
    if (items[0].dataset.staggered) return
    items.forEach(item => (item.dataset.staggered = 'true'))

    gsap.fromTo(items,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container ? document.querySelector(container) : items[0],
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    )
  })
}

// ── 6. COMPTEURS ANIMÉS ──────────────────────────────────
function initCounters() {
  const counterElements = document.querySelectorAll('[data-count]')

  counterElements.forEach(el => {
    if (el.dataset.counted) return
    el.dataset.counted = 'true'

    const target = parseFloat(el.dataset.count)
    const decimals = el.dataset.count.includes('.') ? 1 : 0

    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = decimals > 0
              ? obj.val.toFixed(decimals)
              : Math.round(obj.val).toLocaleString('fr-FR')
          },
        })
      },
    })
  })
}
