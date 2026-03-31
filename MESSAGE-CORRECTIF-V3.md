# MESSAGE CORRECTIF V3 — Élagage + Bugs critiques + Animations

## CONTEXTE
Le site a trop de sections dédoublées (18+ sections). Il faut élaguer les doublons, fixer les bugs visuels critiques, et ajouter les animations premium manquantes. Ce message est à appliquer section par section, en vérifiant après chaque étape.

---

## 1. ÉLAGAGE — Commenter les sections redondantes dans App.jsx

Le fichier `src/App.jsx` a des sections en doublon. **NE PAS supprimer les fichiers ni les imports**, simplement COMMENTER les composants dans le JSX pour les masquer temporairement. On décidera plus tard lesquels garder.

**Sections à COMMENTER dans le JSX (pas supprimer) :**
- `<HeroAlt />` → doublon du Hero, même contenu, dilue l'impact
- `<ServicesAlt />` → doublon de Services (strips), un carrousel redondant
- `<FlotteAlt />` → doublon de Flotte (cards), un carrousel redondant
- `<AvisAlt />` → doublon de Avis, on garde le principal avec marquee
- `<ChiffresImpact />` → les compteurs sont déjà dans Atouts, cette section fait doublon

Commenter aussi les `<SectionDivider />` qui étaient juste avant/après ces sections commentées.

**Exemple de ce qu'il faut faire dans le JSX :**
```jsx
<Hero />
{/* <HeroAlt /> */}
<PartnersBar />
```

**Garder les imports en haut du fichier** — ne rien toucher aux imports.

**App.jsx cible (JSX uniquement) :**
```jsx
<Hero />
{/* <HeroAlt /> */}
<PartnersBar />
<Atouts />
<SectionDivider />
<About />
<SectionDivider />
<Services />
{/* <SectionDivider /> */}
{/* <ServicesAlt /> */}
<SectionDivider />
<Experience />
<SectionDivider />
<Flotte />
{/* <SectionDivider /> */}
{/* <FlotteAlt /> */}
<SectionDivider />
<Zones />
{/* <SectionDivider /> */}
{/* <ChiffresImpact /> */}
<SectionDivider />
<DevisSimulateur />
<SectionDivider />
<Avis />
{/* <SectionDivider /> */}
{/* <AvisAlt /> */}
<SectionDivider />
<FAQ />
<SectionDivider />
<Contact />
<BandeauCTA />
```

Résultat attendu : la page passe de ~18 sections visibles à ~13, plus concentrée et impactante. On pourra décommenter si besoin.

**NE PAS supprimer les fichiers** des composants (HeroAlt.jsx, ServicesAlt.jsx, etc.). On les garde au cas où.

---

## 2. BUG CRITIQUE — Compteurs Atouts affichent "0"

Les compteurs dans la section Atouts n'animent pas. Ils restent à 0, 0/7, 0min, 0€. Le code est correct mais ScrollTrigger ne se déclenche pas correctement à cause de Lenis.

**Fix dans `src/components/sections/Atouts.jsx` :**

Remplacer le useEffect actuel par cette version qui utilise un IntersectionObserver natif comme fallback :

```jsx
useEffect(() => {
  // Fallback: si ScrollTrigger ne se déclenche pas (conflit Lenis),
  // on utilise IntersectionObserver natif
  let triggered = false

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        if (triggered) return
        triggered = true
        triggerAnimations()
      },
    })
  }, sectionRef)

  // Fallback IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true
        triggerAnimations()
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  if (sectionRef.current) observer.observe(sectionRef.current)

  function triggerAnimations() {
    gsap.from('.atout-item', {
      y: 50,
      opacity: 0,
      rotateZ: (i) => (i % 2 === 0 ? -2 : 2),
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    })
    setTimeout(() => {
      ATOUTS.forEach((item, i) => {
        const el = chiffreRefs.current[i]
        if (!el) return
        const target = parseFloat(item.chiffre)
        const decimals = item.chiffre.includes('.') ? 1 : 0
        countUp(el, target, decimals)
      })
    }, 300)
  }

  return () => {
    ctx.revert()
    observer.disconnect()
  }
}, [])
```

---

## 3. PHOTO — Remplacer l'image Services strip "Événements"

Dans `src/components/sections/Services.jsx`, la photo pour le service index 2 (Événements & Soirées) est actuellement correctement définie comme `/images/flotte-chateau.jpeg` dans le code. MAIS vérifier que cette image existe bien dans `public/images/` et qu'elle n'est pas remplacée par une autre image au runtime. Si le strip 03 affiche une photo de mouchoirs/bonbons sur un siège, c'est que l'image est incorrecte.

Vérifier le tableau SERVICES dans le composant et s'assurer que l'entrée index 2 a bien :
```js
image: '/images/flotte-chateau.jpeg'
```

Si le fichier `flotte-chateau.jpeg` n'existe pas, utiliser `flotte-hotel-luxe.jpg` à la place.

---

## 4. ANIMATIONS PREMIUM — Ajout de parallaxe et effets

### 4a. Parallaxe sur les images de fond des sections

Dans **Services.jsx**, ajouter un effet parallaxe sur l'image de fond du strip actif. Dans le useEffect existant, après le code d'animation d'entrée, ajouter :

```jsx
// Parallaxe sur les images de strips
gsap.utils.toArray('.strip-bg-img').forEach((img) => {
  gsap.to(img, {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: img.closest('.strips-container'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  })
})
```

Et s'assurer que chaque image de strip a la classe `strip-bg-img` et un style `scale: 1.2` pour avoir de la marge pour le parallaxe.

### 4b. Parallaxe dans la section Zones

Dans **Zones.jsx**, ajouter un effet parallaxe sur l'image de fond (vignes-provence.jpg) :

```jsx
// Dans le useEffect, après les autres animations
gsap.to('.zones-bg-img', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
  },
})
```

S'assurer que l'image de fond a la classe `zones-bg-img` et un style `scale: 1.3`.

### 4c. Blur-in sur les images Flotte

Dans **Flotte.jsx**, remplacer le simple fade-in des images de véhicules par un blur-in :

```jsx
// Remplacer le gsap.from sur les images
gsap.from('.flotte-vehicle-img', {
  filter: 'blur(15px) grayscale(100%)',
  opacity: 0,
  y: 30,
  rotateZ: (i) => (i % 2 === 0 ? -1.5 : 1.5),
  duration: 1.2,
  stagger: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.flotte-grid',
    start: 'top 80%',
    once: true,
  },
})
```

S'assurer que chaque image de véhicule a la classe `flotte-vehicle-img`.

### 4d. Stagger sur les cards Experience

Dans **Experience.jsx**, s'assurer que les feature cards ont une animation stagger visible :

```jsx
gsap.from('.experience-card', {
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.experience-grid',
    start: 'top 80%',
    once: true,
  },
})
```

### 4e. Parallaxe Hero

Dans **Hero.jsx**, s'assurer que l'image/video Hero a un effet parallaxe profond au scroll :

```jsx
// Dans le useEffect
gsap.to('.hero-media', {
  yPercent: -20,
  scale: 1.1,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
  },
})

// Fadeout du contenu Hero au scroll
gsap.to('.hero-content', {
  opacity: 0,
  y: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: '30% top',
    end: '80% top',
    scrub: 1,
  },
})
```

S'assurer que le conteneur hero a `overflow: hidden` et que le media a les classes correspondantes.

---

## 5. WORD REVEAL — Activer les animations de titre

Vérifier que le composant `CharReveal` fonctionne bien avec GSAP SplitText ou une implémentation maison. Si le composant ne fait qu'afficher le texte sans animation, le réécrire :

```jsx
// src/components/ui/CharReveal.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CharReveal({ text, as: Tag = 'h2', style = {}, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split into words
    const words = text.split(' ')
    el.innerHTML = words
      .map((w) => `<span class="cr-word" style="display:inline-block;overflow:hidden;vertical-align:top"><span class="cr-inner" style="display:inline-block">${w}</span></span>`)
      .join(' ')

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.cr-inner'), {
        yPercent: 110,
        opacity: 0,
        rotateZ: 3,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [text])

  return <Tag ref={ref} style={style} className={className}>{text}</Tag>
}
```

---

## 6. SCROLL TRIGGER REFRESH — Fix Lenis sync

Dans `src/hooks/useLenis.js`, s'assurer que le refresh de ScrollTrigger est bien décalé APRÈS le montage complet de tous les composants :

```jsx
useEffect(() => {
  // Triple RAF pour s'assurer que TOUS les composants sont montés
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })
  })

  // Refresh additionnel après 1s (safety net pour les images lentes)
  const timer = setTimeout(() => {
    ScrollTrigger.refresh()
  }, 1000)

  return () => clearTimeout(timer)
}, [])
```

---

## ORDRE D'APPLICATION

1. **D'abord** : élaguer App.jsx (supprimer les 5 sections redondantes)
2. **Ensuite** : fix le bug compteurs Atouts (IntersectionObserver fallback)
3. **Ensuite** : fix Lenis/ScrollTrigger refresh
4. **Ensuite** : implémenter CharReveal word-by-word
5. **Ensuite** : ajouter parallaxe (Hero, Services, Zones)
6. **Ensuite** : ajouter blur-in Flotte + stagger Experience
7. **Enfin** : vérifier visuellement en naviguant toute la page

## IMPORTANT
- Ne PAS créer de nouvelles sections
- Ne PAS ajouter de nouveaux composants
- Garder le même design system (couleurs, typo, border-radius: 0)
- Chaque animation doit utiliser `once: true` pour ne jouer qu'une fois
- Toujours utiliser `gsap.context()` avec cleanup dans le return
- Tester que les compteurs Atouts affichent bien 4.9, 24/7, 15min, 0€
