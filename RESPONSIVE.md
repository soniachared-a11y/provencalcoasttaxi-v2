# RESPONSIVE — Grilles, marges, breakpoints
> Mobile-first. Tester 375px / 768px / 1280px / 1440px. Chaque pixel justifié.

---

## 📱 BREAKPOINTS OFFICIELS

```
xs:  375px  → iPhone SE, petits mobiles (base)
sm:  640px  → Grands mobiles, paysage
md:  768px  → Tablette portrait (iPad)
lg:  1024px → Tablette paysage, petit laptop
xl:  1280px → Desktop standard
2xl: 1440px → Grand écran (référence design)
```

### Tailwind — Utiliser uniquement ces préfixes
```
(base)  → mobile 375px
md:     → tablette 768px
lg:     → desktop 1024px
xl:     → grand desktop 1280px
```

---

## 📐 CONTAINER & MARGES

### Max-widths par section
```
Container global :   max-w-6xl (1152px) + mx-auto + px-4 md:px-8
Hero content :       max-w-4xl (896px) — centré
Texte paragraphe :   max-w-2xl (672px) — 65ch max
FAQ :                max-w-3xl (768px) — centré
Contact form :       max-w-5xl (1024px) en 2 colonnes
```

### Padding horizontal (padding latéral)
```
Mobile  (< 768px)  : px-4 (16px)
Tablette (768px+)  : px-8 (32px)
Desktop (1280px+)  : px-8 (32px) — le container max-w limite
```

### Padding vertical des sections
```
Section compacte (Atouts)  : py-16 (64px) mobile / py-20 (80px) desktop
Section standard           : py-20 (80px) mobile / py-24 (96px) desktop
Section premium (Hero)     : 100svh (full)
Section Contact            : py-20 (80px) mobile / py-32 (128px) desktop
```

---

## 🔲 GRILLES PAR SECTION

### Atouts (4 items)
```
Mobile :   grid-cols-2, gap-4
Tablette : grid-cols-2, gap-6
Desktop :  grid-cols-4, gap-6
```

### Services (6 cards)
```
Mobile :   grid-cols-1, gap-4
Tablette : grid-cols-2, gap-5
Desktop :  grid-cols-3, gap-6
```

### Flotte (3 véhicules)
```
Mobile :   grid-cols-1, gap-6 (stack vertical)
Tablette : grid-cols-1, gap-6 (stack, cards larges)
Desktop :  grid-cols-3, gap-6
```

### Avis (3 témoignages)
```
Mobile :   grid-cols-1, gap-4
Tablette : grid-cols-1, gap-4
Desktop :  grid-cols-3, gap-6
```

### Contact (formulaire + infos)
```
Mobile :   grid-cols-1, gap-8 (form en haut, infos en bas)
Tablette : grid-cols-1, gap-8
Desktop :  grid-cols-[3fr_2fr], gap-12
```

---

## 📝 TYPOGRAPHIE RESPONSIVE

| Élément | Mobile | Tablette | Desktop |
|---------|--------|----------|---------|
| H1 Hero | 36px | 52px | 72px |
| H2 section | 28px | 36px | 48px |
| H3 carte | 18px | 20px | 20px |
| Label section | 11px | 11px | 11px |
| Body | 15px | 16px | 16px |
| Numéro tel | 28px | 36px | 48px |
| Button | 14px | 15px | 15px |

### Classes Tailwind correspondantes
```
H1 :      text-4xl md:text-5xl lg:text-7xl
H2 :      text-3xl md:text-4xl lg:text-5xl
H3 :      text-lg md:text-xl
Label :   text-xs (tracking-widest)
Body :    text-sm md:text-base
Numéro :  text-3xl md:text-4xl lg:text-5xl
```

---

## 🧭 NAV RESPONSIVE

```
Desktop (md+) :
  - Layout horizontal : logo | liens | CTA
  - Hauteur : 72px
  - CTA téléphone visible

Mobile (< md) :
  - Layout : logo | hamburger
  - Hauteur : 64px
  - Menu drawer vertical animé GSAP
  - CTA téléphone dans le drawer (bouton gold full-width)
  - Liens : Inter 16px, padding 12px, séparateur border-b
```

---

## 🦶 FOOTER RESPONSIVE

```
Desktop : centré, 1 ligne logo + 1 ligne liens + 1 ligne copyright
Mobile  : stack vertical, même ordre, plus d'espacement
```

---

## 📲 ÉLÉMENTS MOBILE-ONLY

### CTA sticky téléphone
```jsx
// Visible uniquement sur mobile, fixed bottom
<a href="tel:+33615963275"
   className="fixed bottom-4 left-4 right-4 z-50 md:hidden
              flex items-center justify-center gap-2
              bg-gold text-dark font-bold py-4 rounded-xl
              shadow-2xl shadow-black/50">
  Appeler — 06 15 96 32 75
</a>
// Ajouter padding-bottom: 80px sur le footer pour ne pas être masqué
```

---

## 🎬 ANIMATIONS RESPONSIVE

### Désactiver les animations lourdes sur mobile
```js
// Dans chaque composant avec parallax ou animations complexes
const isMobile = window.innerWidth < 768

if (!isMobile) {
  // Parallax Sainte-Victoire
  gsap.to(mountainRef.current, { yPercent: -15, scrub: true, ... })
}

// Réduire les stagger sur mobile
gsap.from('.card', {
  stagger: isMobile ? 0.06 : 0.12,
  ...
})
```

### Respect de prefers-reduced-motion
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!prefersReduced) {
  // Lancer les animations GSAP
} else {
  // Rendre les éléments directement visibles sans animation
  gsap.set(elements, { opacity: 1, y: 0 })
}
```

---

## ✅ CHECKLIST RESPONSIVE AVANT LIVRAISON

### 375px (iPhone SE)
- [ ] Pas de scroll horizontal
- [ ] Texte lisible sans zoom (min 14px)
- [ ] CTA sticky visible et cliquable
- [ ] Hero prend bien 100svh
- [ ] Nav hamburger fonctionne
- [ ] Formulaire utilisable avec le clavier mobile
- [ ] Flotte en stack vertical lisible

### 768px (iPad portrait)
- [ ] Grilles passent en 2 colonnes
- [ ] Nav reste en mobile (hamburger)
- [ ] Espacements cohérents

### 1280px (Desktop standard)
- [ ] Grilles en 3-4 colonnes
- [ ] Nav desktop avec liens visibles
- [ ] CTA sticky disparaît
- [ ] Animations actives

### 1440px (Grand écran)
- [ ] Container max-width respecté (pas de contenu qui s'étale)
- [ ] Pas de zones vides excessives sur les côtés

---

## 🚫 ERREURS RESPONSIVE FRÉQUENTES À ÉVITER

1. **Overflow horizontal** → Toujours `overflow-x: hidden` sur body
2. **Images sans max-width** → `max-w-full` sur toutes les images
3. **Texte trop petit** → min 14px sur mobile
4. **Touch targets trop petits** → min 44x44px (boutons, liens)
5. **Inputs trop petits** → min height 48px sur mobile (évite zoom iOS)
6. **Padding insuffisant** → min px-4 (16px) sur mobile
7. **Font-size sur `html`** → Ne jamais fixer en px, laisser 100% (resp. accessibilité)
8. **Position fixed qui déborde** → Tester left/right/bottom sur petits écrans
