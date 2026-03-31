# ANIMATIONS — Spec GSAP + Lenis (Thème Light V2)
> Référence pour Claude Code. Code exact par composant.

---

## SETUP GLOBAL

### Lenis (dans `hooks/useLenis.js`)
```js
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)) })
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.on('scroll', ScrollTrigger.update)
```

### Import standard dans chaque composant
```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)
```

### Pattern useEffect obligatoire
```js
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations ici
  }, containerRef)
  return () => ctx.revert()
}, [])
```

### Easing de référence
```
Standard:     power2.out (entrées au scroll)
Premium:      power3.out (hero, éléments importants)
Élastique:    cubic-bezier(0.76, 0, 0.24, 1) (strips expansion)
Rebond:       back.out(1.4) (éléments ponctuels: icône flottante)
Linéaire:     none (parallax scrub)
```

---

## NAV

### Entrée
```js
gsap.from(navRef.current, {
  y: -20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.1
})
```

### Changement fond au scroll
```js
const handleScroll = () => {
  if (window.scrollY > 50) {
    gsap.to(navRef.current, {
      backgroundColor: 'rgba(246,243,238,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E8E4DE',
      duration: 0.3
    })
  } else {
    gsap.to(navRef.current, {
      backgroundColor: 'transparent',
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid transparent',
      duration: 0.3
    })
  }
}
```
Note: Sur le Hero (fond sombre), la nav est blanche/transparente. Dès qu'on scrolle vers les sections claires, elle passe en fond crème.

### Drawer mobile
```js
// Ouverture
gsap.from(drawerRef.current, {
  height: 0, opacity: 0, duration: 0.4, ease: 'power3.out'
})
// Fermeture
gsap.to(drawerRef.current, {
  height: 0, opacity: 0, duration: 0.3, ease: 'power2.in',
  onComplete: () => setOpen(false)
})
```

---

## HERO — Séquence d'entrée

### Technique word-by-word reveal
```html
<span class="overflow-hidden inline-block">
  <span class="hero-word inline-block">MOT</span>
</span>
```

### Timeline
```js
const tl = gsap.timeline({ delay: 0.3 })

// Label "Chauffeur privé — Aix-en-Provence"
tl.from('.hero-tag', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })

// H1 ligne 1 : "L'élégance provençale"
tl.from('.hero-word-1', {
  y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out'
}, '-=0.3')

// H1 ligne 2 italic : "à votre service"
tl.from('.hero-word-2', {
  y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out'
}, '-=0.4')

// Ligne décorative lavande
tl.from('.hero-line', { scaleX: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'left' }, '-=0.3')

// Sous-titre
tl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')

// CTAs
tl.from('.hero-actions > *', {
  y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
}, '-=0.2')

// Métriques coin haut-droit (4.9, 24/7, 10+)
tl.from('.hero-metric', {
  y: 20, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out'
}, '-=0.6')
```

### Parallax vidéo
```js
gsap.to('.hero-video', {
  yPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
})
```

---

## ATOUTS — CountUp au scroll

```js
// Grille entière
gsap.from('.atout-item', {
  y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
  scrollTrigger: { trigger: '.atouts-grid', start: 'top 82%', once: true }
})

// CountUp des chiffres (via GSAP)
gsap.from('.atout-number', {
  textContent: 0, duration: 1.5, ease: 'power2.out',
  snap: { textContent: 0.1 },
  scrollTrigger: { trigger: '.atouts-grid', start: 'top 82%', once: true }
})
```

---

## SERVICES — Expanding Strips

### Entrée au scroll
```js
gsap.from('.strips-container', {
  y: 60, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.strips-container', start: 'top 85%', once: true }
})
```

### Expansion au clic (géré en CSS + state React)
```css
.strip {
  flex: 1;
  transition: flex 0.7s cubic-bezier(0.76, 0, 0.24, 1);
}
.strip.active {
  flex: 5;
}
```

### Contenu interne (CSS transitions)
```css
/* Texte vertical (fermé) */
.strip-collapsed {
  opacity: 1;
  transition: opacity 0.3s ease;
}
.strip.active .strip-collapsed {
  opacity: 0;
  pointer-events: none;
}

/* Contenu étendu (ouvert) */
.strip-expanded {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
}
.strip.active .strip-expanded {
  opacity: 1;
  transform: translateY(0);
}

/* Barre accent lavande */
.strip-accent-bar {
  height: 0;
  transition: height 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}
.strip.active .strip-accent-bar {
  height: 100%;
}
```

### Photo background zoom au survol
```js
// Via onMouseEnter sur chaque strip
gsap.to(stripBgRef, { scale: 1.03, duration: 0.5, ease: 'power2.out' })
// Via onMouseLeave
gsap.to(stripBgRef, { scale: 1, duration: 0.5, ease: 'power2.out' })
```

---

## FLOTTE — Entrée stagger

```js
gsap.from('.flotte-item', {
  y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
  scrollTrigger: { trigger: '.flotte-grid', start: 'top 80%', once: true }
})
```

### Hover sur chaque item
```js
// onMouseEnter
gsap.to(el, { backgroundColor: '#FAF8F5', duration: 0.3 })
// onMouseLeave
gsap.to(el, { backgroundColor: '#FFFFFF', duration: 0.3 })
```

---

## AVIS — Citation principale + Marquee

### Citation principale
```js
gsap.from('.avis-featured', {
  y: 40, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.avis-section', start: 'top 80%', once: true }
})

// Guillemet décoratif géant
gsap.from('.avis-quote-mark', {
  scale: 0.5, opacity: 0, duration: 1.2, ease: 'power2.out',
  scrollTrigger: { trigger: '.avis-section', start: 'top 80%', once: true }
})
```

### Marquee horizontal infini (CSS animation)
```css
.marquee-track {
  display: flex;
  gap: 48px;
  animation: marquee 30s linear infinite;
  width: max-content;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Note: Le contenu du marquee est dupliqué 2x pour créer la boucle infinie.
Pause au hover: `.marquee-track:hover { animation-play-state: paused; }`

### Changement d'avis principal (optionnel, GSAP)
```js
// Toutes les 6s, changer l'avis principal avec un fade out/in
const swapTestimonial = (index) => {
  gsap.to('.avis-text', { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in', onComplete: () => {
    // Mettre à jour le texte
    gsap.fromTo('.avis-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }})
}
```

---

## ZONES — Carte interactive

```js
// Entrée
gsap.from('.zones-layout', {
  y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.zones-section', start: 'top 80%', once: true }
})

// Items de la liste (stagger)
gsap.from('.zones-item', {
  x: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
  scrollTrigger: { trigger: '.zones-list', start: 'top 82%', once: true }
})
```

### Hover items
```css
.zones-item::after {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: transparent;
  transition: background 0.3s ease;
}
.zones-item:hover::after,
.zones-item.active::after {
  background: var(--lavande);
}
```

---

## FAQ — Accordéon GSAP

```js
const openItem = (contentEl) => {
  gsap.set(contentEl, { height: 'auto', display: 'block' })
  const h = contentEl.offsetHeight
  gsap.fromTo(contentEl, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'power2.out' })
}

const closeItem = (contentEl) => {
  gsap.to(contentEl, {
    height: 0, opacity: 0, duration: 0.3, ease: 'power2.in',
    onComplete: () => gsap.set(contentEl, { display: 'none' })
  })
}
```

---

## CONTACT — Split reveal

```js
// Colonne infos (fond sombre, depuis la gauche)
gsap.from('.contact-info', {
  x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true }
})

// Colonne formulaire (depuis la droite, délai)
gsap.from('.contact-form', {
  x: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true }
})
```

---

## ICÔNE TÉLÉPHONE FLOTTANTE

### Entrée (après chargement page)
```js
gsap.from('.phone-float', {
  scale: 0, opacity: 0, duration: 0.6, delay: 2,
  ease: 'back.out(2)',
})
```

### Pulse subtil continu (optionnel)
```js
gsap.to('.phone-float', {
  boxShadow: '0 4px 20px rgba(61,90,128,0.3), 0 0 0 8px rgba(61,90,128,0.08)',
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
})
```

---

## RÈGLES DE PERFORMANCE

1. Uniquement `transform` + `opacity` dans les animations (jamais `left`, `top`, `width`, `height`)
2. `will-change: transform` sur hero-video et Sainte-Victoire
3. `once: true` sur tous les ScrollTrigger (pas de replay au scroll retour)
4. `gsap.context()` + cleanup `ctx.revert()` dans chaque useEffect
5. Mobile (< 768px) : désactiver parallax hero, simplifier les strips à 3 visibles
6. `ScrollTrigger.refresh()` après initialisation Lenis
7. Marquee : `animation-play-state: paused` au hover pour l'accessibilité
