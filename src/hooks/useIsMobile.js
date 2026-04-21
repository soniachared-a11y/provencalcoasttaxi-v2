// Hook : détecte mobile via media query pour éviter de charger des assets lourds
// (vidéos) sur connexions cellulaires et petits écrans.
import { useEffect, useState } from 'react'

export function useIsMobile(maxWidth = 768) {
  // Côté SSR/pré-render : on ne connaît pas la taille. On assume mobile pour éviter
  // de charger la vidéo côté bots Lighthouse mobile. Hydration côté client corrige.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(`(max-width: ${maxWidth}px)`).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [maxWidth])

  return isMobile
}
