// Hook : déclenche la lecture d'une vidéo uniquement quand elle entre dans le viewport.
// Améliore drastiquement LCP/TBT car le navigateur ne télécharge pas la vidéo avant
// qu'elle soit visible, et les premières frames rendues sont remplacées par le poster.
import { useEffect, useRef } from 'react'

export function useLazyVideo({ rootMargin = '200px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // Safari iOS : playsInline obligatoire, on force l'attribut si jamais oublié
    video.playsInline = true

    const tryPlay = () => {
      // Le .play() peut échouer si l'utilisateur n'a pas interagi, on ignore silencieusement
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    // Si l'API IntersectionObserver n'est pas dispo (très rare) → fallback : play direct
    if (typeof IntersectionObserver === 'undefined') {
      video.preload = 'auto'
      tryPlay()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Visible → on upgrade le preload et on déclenche le play
          if (video.preload === 'none' || video.preload === '') video.preload = 'auto'
          if (video.paused) tryPlay()
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 }
    )

    io.observe(video)
    return () => io.disconnect()
  }, [rootMargin])

  return ref
}
