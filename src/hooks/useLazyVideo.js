// Hook : n'injecte la source vidéo dans le DOM qu'au moment où la section est
// visible ET après que la page soit chargée (idle). Ça évite que le navigateur
// télécharge la vidéo pendant le chargement critique, ce qui tue le LCP mobile.
//
// Usage :
//   const { ref, src } = useLazyVideo(videoUrl)
//   return <video ref={ref}><source src={src} type="video/mp4" /></video>
//
// Tant que `src` est vide, aucune requête réseau n'est faite pour la vidéo.
import { useEffect, useRef, useState } from 'react'

export function useLazyVideo(url, { rootMargin = '200px', idleDelay = 1500 } = {}) {
  const ref = useRef(null)
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (!url || src) return // déjà activé ou pas d'URL
    const video = ref.current
    if (!video) return

    video.playsInline = true

    let io
    let idleTimer
    let activated = false

    const activate = () => {
      if (activated) return
      activated = true
      // Injecte la source + reload → commence le download
      setSrc(url)
      // Petit délai pour laisser React appliquer le src, puis play
      setTimeout(() => {
        try {
          video.load()
          const p = video.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } catch {}
      }, 50)
    }

    // Fallback SSR / anciens navigateurs
    if (typeof IntersectionObserver === 'undefined') {
      idleTimer = setTimeout(activate, idleDelay)
      return () => clearTimeout(idleTimer)
    }

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Visible → on attend que la page soit idle (LCP mesuré) avant d'activer
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(activate, { timeout: idleDelay + 500 })
          } else {
            idleTimer = setTimeout(activate, idleDelay)
          }
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 }
    )

    io.observe(video)
    return () => {
      io?.disconnect()
      clearTimeout(idleTimer)
    }
  }, [url, src, rootMargin, idleDelay])

  return { ref, src }
}
