# MESSAGE CORRECTIF V1 — À copier-coller dans Claude Code

> Copie ce message tel quel dans Claude Code. Il corrige les bugs critiques du site.

---

## Message à copier :

```
Lis DESIGN-SYSTEM.md, ANIMATIONS.md et HOMEPAGE-LAYOUT.md pour te remettre en contexte.

Le site a des bugs critiques à corriger. Voici la liste précise :

---

### BUG 1 — Vidéo Hero ne joue pas

Le <video> a readyState:0 et paused:true malgré autoPlay. Le fichier public/hero-video.mp4 existe (3.9MB, MP4 valide).

Correctif dans Hero.jsx :
- Ajouter un poster="/images/mercedes-motion.jpeg" sur le <video> comme fallback visuel
- Ajouter un useEffect qui force video.play() après mount avec un catch silencieux
- Ajouter l'attribut preload="auto" sur le <video>
- Exemple pattern :
  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.play().catch(() => {}) // autoplay policy silencieux
    }
  }, [])

---

### BUG 2 — Compteurs Atouts affichent des mauvaises valeurs (0.4, 2/7, 1min au lieu de 4.9, 24/7, 15min)

Le problème : le onComplete du gsap.from() se déclenche quand le PREMIER élément du stagger finit, pas quand TOUS les éléments finissent. Du coup le countUp démarre trop tôt et les valeurs sont incomplètes.

Correctif dans Atouts.jsx :
- Séparer le stagger reveal ET le countUp en deux animations distinctes
- Le reveal (gsap.from .atout-item) reste pareil avec ScrollTrigger once:true
- Le countUp se lance via le callback onEnter du ScrollTrigger, PAS via onComplete du stagger
- Pattern corrigé :

  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: 'top 82%',
    once: true,
    onEnter: () => {
      // 1. Reveal stagger
      gsap.from('.atout-item', {
        y: 30, opacity: 0, duration: 0.7,
        stagger: 0.1, ease: 'power2.out',
      })
      // 2. CountUp avec délai pour laisser le reveal commencer
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
  })

---

### BUG 3 — Aucune animation de reveal visible au scroll (les éléments apparaissent d'un coup)

Le problème : les éléments démarrent en opacity:0 via GSAP from() mais le ScrollTrigger ne déclenche pas correctement car Lenis override le scroll natif. Le refresh() dans useLenis.js est appelé trop tôt (avant que les composants soient montés).

Correctif en 2 parties :

A) Dans useLenis.js, ajouter un délai au refresh :
   Remplacer :
     ScrollTrigger.refresh()
   Par :
     // Attendre que tous les composants soient montés
     requestAnimationFrame(() => {
       requestAnimationFrame(() => {
         ScrollTrigger.refresh()
       })
     })

B) Dans chaque composant qui utilise ScrollTrigger (Atouts, Services, Flotte, Zones, Avis, FAQ, Contact), s'assurer que les éléments animés ont une opacity initiale visible en CSS (pas opacity:0 en inline style), et que c'est UNIQUEMENT le gsap.from() qui les rend invisibles. Si un élément n'apparaît jamais, c'est que le ScrollTrigger n'a pas fired — ajouter un markers:true temporaire pour debug puis retirer.

C) Ajouter des animations de reveal fade-in à TOUTES les sections qui n'en ont pas encore. Chaque section doit avoir au minimum un gsap.from sur son contenu principal avec :
   - y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
   - scrollTrigger: { trigger: sectionRef, start: 'top 85%', once: true }

Sections à vérifier/ajouter : Flotte (stagger sur les 3 colonnes), Zones (gauche puis droite), FAQ (stagger sur les questions), Contact (split gauche/droite), Footer (fade-in simple).

---

### BUG 4 — Pas de parallaxe (effet de profondeur manquant)

Ajouter un léger parallaxe sur ces éléments pour donner de la vie :

A) Section Flotte — les 3 images de véhicules :
   gsap.to('.flotte-image', {
     yPercent: -8,
     ease: 'none',
     scrollTrigger: {
       trigger: '[section flotte]',
       start: 'top bottom',
       end: 'bottom top',
       scrub: true,
     }
   })

B) Section Zones — l'image/map gauche :
   Même pattern, yPercent: -12

C) Section Avis — la citation principale :
   Léger scale de 0.98 à 1 en scrub

---

### BUG 5 — Métriques Hero incorrectes

Dans Hero.jsx, la 3ème métrique affiche "10+ Ans d'expérience".
Remplace le tableau METRICS par :
  const METRICS = [
    { value: '4.9', label: 'Note Google' },
    { value: '24/7', label: 'Disponibilité' },
    { value: '15min', label: 'Temps de réponse' },
  ]

---

### AMÉLIORATION 6 — Nav : changement de couleur au scroll absent

La Nav doit changer de fond quand on scroll au-delà du Hero :
- Sur le Hero (scroll < 100vh) : fond transparent, texte blanc
- Au-delà : fond var(--cream) avec border-bottom 1px solid var(--border), texte var(--texte)
- Transition : background 0.3s ease, box-shadow 0.3s ease
- Utiliser un ScrollTrigger sur le Hero avec onLeave/onEnterBack pour toggle une classe

---

### AMÉLIORATION 7 — Hover effects manquants

Ajouter des micro-interactions hover sur :
- Les strips Services : léger scale(1.02) au hover sur la strip fermée
- Les cards Flotte : image scale(1.05) avec overflow:hidden
- Les liens FAQ : léger x: 4 sur le chevron au hover
- Les zones dans la liste : highlight fond var(--surface-alt)

---

Après toutes ces corrections, lance npm run build && npm run preview et vérifie que :
1. La vidéo Hero joue (ou au minimum l'image fallback s'affiche)
2. Les compteurs affichent 4.9, 24/7, 15min, 0€
3. Chaque section a une animation de reveal au scroll
4. Les images Flotte ont un léger parallaxe
5. La Nav change de couleur quand on quitte le Hero
6. Le site est fluide à 60fps (pas de jank)
```

---

## Notes pour Sonia

Ce message corrige les 5 bugs + ajoute 2 améliorations. Les problèmes venaient de :
- La synchronisation Lenis ↔ ScrollTrigger (timing du refresh)
- Le onComplete GSAP qui fire trop tôt sur les staggers
- L'autoplay vidéo qui ne se force pas après mount React
- Les animations manquantes sur certaines sections

Après ce message, le site devrait être vivant avec des animations fluides.
