import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Phone } from '@phosphor-icons/react'

export default function PhoneFloat({ hide = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Entry: scale 0→1 after 2s
    gsap.fromTo(el,
      { scale: 0 },
      { scale: 1, duration: 0.6, delay: 2, ease: 'back.out(2)' }
    )

    // Subtle pulse
    gsap.to(el, {
      boxShadow: '0 4px 30px rgba(107,125,74,0.5)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.6,
    })
  }, [])

  if (hide) return null

  return (
    <a
      ref={ref}
      href="tel:+33615963275"
      aria-label="Appeler"
      data-cta
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999,
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: 'var(--lavande)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(107,125,74,0.3)',
        textDecoration: 'none',
        transform: 'scale(0)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Phone size={24} color="#fff" weight="fill" />
    </a>
  )
}
