import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '../../data/content'
import CharReveal from '../ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({ faq, index, isOpen, onToggle, total }) {
  const itemRef = useRef(null)
  const contentRef = useRef(null)
  const barRef = useRef(null)
  const numberRef = useRef(null)
  const id = `faq-${index}`
  const num = String(index + 1).padStart(2, '0')

  // Animate open/close
  useEffect(() => {
    const el = contentRef.current
    const bar = barRef.current
    const numEl = numberRef.current
    if (!el) return

    if (isOpen) {
      // Kill any running tweens on this element first
      gsap.killTweensOf([el, bar, numEl])

      // 1. Show content container
      gsap.set(el, { display: 'block', height: 'auto', clipPath: 'none' })
      const h = el.scrollHeight
      gsap.set(el, { height: 0, clipPath: 'inset(0 0 100% 0)' })

      // 2. Animated timeline for opening
      const tl = gsap.timeline()

      // Accent bar expands
      if (bar) {
        tl.to(bar, {
          height: '100%',
          duration: 0.5,
          ease: 'power3.inOut',
        }, 0)
      }

      // Number color shifts
      if (numEl) {
        tl.to(numEl, {
          color: 'var(--olive)',
          duration: 0.3,
        }, 0)
      }

      // Content expands with clip-path reveal
      tl.fromTo(el,
        { height: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          height: h,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.6,
          ease: 'power3.inOut',
        }, 0.1)

      // Words stagger in
      const words = el.querySelectorAll('.faq-word')
      if (words.length) {
        tl.from(words, {
          opacity: 0,
          y: 8,
          duration: 0.3,
          stagger: 0.015,
          ease: 'power2.out',
        }, 0.3)
      }
    } else {
      // Kill any running tweens before closing
      gsap.killTweensOf([el, bar, numEl])
      const tl = gsap.timeline()

      if (bar) {
        tl.to(bar, {
          height: '0%',
          duration: 0.3,
          ease: 'power2.in',
        }, 0)
      }

      if (numEl) {
        tl.to(numEl, {
          color: 'var(--texte-faint)',
          duration: 0.3,
        }, 0)
      }

      tl.to(el, {
        height: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => gsap.set(el, { display: 'none' }),
      }, 0)
    }
  }, [isOpen])

  // Split answer into words for stagger
  const answerWords = faq.r.split(' ')

  return (
    <div
      ref={itemRef}
      style={{
        position: 'relative',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s ease',
      }}
      className="faq-item"
      onMouseEnter={e => {
        if (!isOpen) e.currentTarget.style.background = 'var(--surface-alt)'
      }}
      onMouseLeave={e => {
        if (!isOpen) e.currentTarget.style.background = 'transparent'
      }}
    >
      {/* Accent bar left */}
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 3,
          height: '0%',
          background: 'var(--olive)',
          borderRadius: 2,
        }}
      />

      {/* Question button */}
      <button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={id}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '28px 0 28px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 20,
        }}
      >
        {/* Number */}
        <span
          ref={numberRef}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 20,
            color: isOpen ? 'var(--olive)' : 'var(--texte-faint)',
            minWidth: 32,
            transition: 'color 0.3s',
          }}
        >
          {num}
        </span>

        {/* Question text */}
        <span style={{
          flex: 1,
          fontFamily: 'Sora, sans-serif',
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--texte)',
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>

        {/* Icon morph: Plus ↔ Minus */}
        <span style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: isOpen ? 'var(--olive)' : 'transparent',
          border: isOpen ? 'none' : '1px solid var(--border)',
          color: isOpen ? '#fff' : 'var(--texte-light)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2} />}
        </span>
      </button>

      {/* Answer with word stagger */}
      <div
        ref={contentRef}
        id={id}
        role="region"
        style={{
          overflow: 'hidden',
          height: 0,
          display: 'none',
          clipPath: 'inset(0 0 100% 0)',
        }}
      >
        <div style={{
          padding: '0 24px 32px 76px',
          lineHeight: 1.8,
        }}>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--texte-light)',
            margin: 0,
          }}>
            {answerWords.map((word, i) => (
              <span key={i} className="faq-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1)
  const [autoPlay, setAutoPlay] = useState(false)
  const sectionRef = useRef(null)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  const handleToggle = useCallback((index) => {
    setAutoPlay(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) gsap.killTweensOf(progressRef.current)
    setOpenIndex(prev => prev === index ? -1 : index)
  }, [])

  // Stagger reveal each FAQ item individually
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each FAQ item reveals with stagger
      gsap.from('.faq-item', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            setTimeout(() => {
              setAutoPlay(true)
              setOpenIndex(0)
            }, 900)
          },
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Auto-cycle with progress bar
  useEffect(() => {
    if (!autoPlay) return

    // Animate progress bar
    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 5,
          ease: 'none',
          transformOrigin: 'left',
        }
      )
    }

    timerRef.current = setInterval(() => {
      setOpenIndex(prev => {
        const next = (prev + 1) % FAQS.length
        // Reset progress
        if (progressRef.current) {
          gsap.fromTo(progressRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 5, ease: 'none', transformOrigin: 'left' }
          )
        }
        return next
      })
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [autoPlay])

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{ background: 'var(--surface)' }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--olive)',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Questions fréquentes
          </span>
          <CharReveal
            text="Tout savoir avant de réserver"
            as="h2"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 36,
              fontWeight: 400,
              color: 'var(--texte)',
              lineHeight: 1.2,
              margin: '0 0 20px 0',
            }}
          />
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            maxWidth: 480,
            margin: '0 auto',
          }}>
            Retrouvez les réponses aux questions les plus fréquentes de nos clients.
          </p>
        </div>

        {/* Auto-cycle progress bar */}
        {autoPlay && (
          <div style={{
            width: '100%',
            height: 2,
            background: 'var(--border)',
            marginBottom: 8,
            overflow: 'hidden',
          }}>
            <div
              ref={progressRef}
              style={{
                height: '100%',
                background: 'var(--olive)',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
              }}
            />
          </div>
        )}

        {/* FAQ list */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
              total={FAQS.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
