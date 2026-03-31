// Hook Lenis — smooth scroll connecté à GSAP
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Connecter Lenis à GSAP ticker pour synchroniser ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Sync Lenis avec ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Exposer Lenis globalement pour que les composants puissent le stopper/démarrer
    window.__lenis = lenis

    // Triple RAF pour s'assurer que tous les composants sont montés
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      })
    })

    // Smooth anchor scroll via Lenis
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target, { duration: 1.2, offset: -80 })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])
}
