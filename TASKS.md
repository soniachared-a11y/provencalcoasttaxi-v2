# TASKS — Instructions pour Claude Code
> Lire MEMORY.md et DECISIONS.md en premier. Travailler section par section dans l'ordre ci-dessous. Chaque tâche = un composant finalisé, testé, animé.

---

## ⚠️ RÈGLES ABSOLUES
1. Lire `MEMORY.md` avant toute chose
2. Toutes les données viennent de `src/data/content.js` — ne jamais hardcoder
3. Animations uniquement sur `transform` et `opacity` (performance GPU)
4. Chaque composant = son propre fichier dans le bon dossier
5. Tester `npm run build` sans erreur après chaque composant
6. Responsive : mobile-first, tester 375px / 768px / 1440px
7. Jamais d'emoji dans les icônes — utiliser du texte ou SVG inline
8. Valider Lighthouse > 90 en fin de projet

---

## TÂCHE 0 — Nettoyer les placeholders
**Fichiers :** `src/components/sections/*.jsx`, `src/components/layout/*.jsx`
- Supprimer les placeholders générés automatiquement
- Vérifier que `App.jsx` importe correctement tous les composants
- Vérifier que `src/index.css` est propre et que Tailwind compile
- Tester `npm run dev` → page blanche sans erreur console

---

## TÂCHE 1 — Nav
**Fichier :** `src/components/layout/Nav.jsx`

**Comportement :**
- Fixed top, z-50, full width
- Fond : transparent au top → `bg-[#0A0806]/95 backdrop-blur` au scroll (changer au-delà de 50px)
- Bordure bottom : `1px solid rgba(201,168,76,0.15)` — apparaît au scroll
- Logo : texte "PROVENÇAL COAST" (Playfair Display, gold) + "TAXI & CHAUFFEUR" (Inter, small, stone-muted)
- Links desktop : Inter 13px, stone-muted, hover → gold, transition 300ms
- CTA desktop : bouton gold `06 15 96 32 75` — pill shape
- Mobile : hamburger menu → drawer qui s'ouvre du haut avec animation GSAP (height 0 → auto)
- Hauteur nav : 72px desktop, 64px mobile

**Animation :**
- Entrée page : fade-in depuis y:-20 en 0.6s après 0.1s delay (GSAP, pas au scroll)

---

## TÂCHE 2 — Hero
**Fichier :** `src/components/sections/Hero.jsx`

**Layout :**
- Full viewport height (100svh)
- Centré verticalement et horizontalement
- Fond : `#0A0806` + radial gradient or très subtil au centre
- Silhouette Sainte-Victoire : importer `SaintVictoire` depuis `components/ui/SaintVictoire.jsx`, positionner en absolute bottom-0 full width, z-0

**Contenu (ordre vertical) :**
1. Badge : `⭐ Service Premium 24h/24 — Licence VTC N°013230073` — pill border gold/30, texte gold, Inter 12px
2. Titre H1 : "Chauffeur Privé" (blanc) + saut de ligne + "Aix-en-Provence" (gold) — Playfair Display, 72px desktop / 42px mobile
3. Sous-titre : Inter 18px stone-muted, max-w-xl
4. Numéro de téléphone : `06 15 96 32 75` — Playfair 48px desktop / 32px mobile, gold, lien tel:
5. Deux CTAs : "Réserver en ligne →" (bg gold) + "WhatsApp" (border gold)
6. Adresse : stone-muted 13px, bas du hero

**Animation (séquence GSAP timeline, pas au scroll) :**
```
t=0.0s  Badge       → fade-in y:20 → 0
t=0.3s  H1 ligne 1  → chaque mot clip reveal (overflow hidden, y:100% → 0)
t=0.5s  H1 ligne 2  → idem
t=0.8s  Sous-titre  → fade-in y:20 → 0
t=1.0s  Numéro      → scale 0.8 → 1 + fade-in
t=1.2s  CTAs        → stagger fade-in y:20 → 0
t=1.4s  Adresse     → fade-in
t=0.0s  Sainte-Victoire → fade-in opacity 0 → 0.06 en 2s (parallax scrub ensuite)
```

**Parallax Sainte-Victoire :**
- Sur scroll : `yPercent: -15`, scrub: true, start: 'top top', end: 'bottom top'

**Scroll indicator :**
- Flèche animée (bounce CSS ou GSAP yoyo) en bas du hero

---

## TÂCHE 3 — Atouts (4 stats/badges)
**Fichier :** `src/components/sections/Atouts.jsx`

**Layout :**
- Fond : `var(--surface)` — #141009
- 4 colonnes desktop, 2x2 tablette, 2x2 mobile
- Chaque carte : border gold/15, rounded-xl, padding 32px, texte centré
- Ligne décorative gold sous le titre de chaque carte (2px, w-8, mx-auto)

**Contenu :** voir `ATOUTS` dans `data/content.js`

**Animation (ScrollTrigger) :**
- Les 4 cartes : stagger fadeUp depuis y:40 opacity:0, stagger 0.12s, trigger: section top 80%

---

## TÂCHE 4 — Services (grille 6)
**Fichier :** `src/components/sections/Services.jsx`

**Layout :**
- Fond : `var(--bg)`
- Header section : label "CE QUE NOUS PROPOSONS" (Inter 11px tracking-widest gold) + H2 Playfair blanc
- Grille : 3 colonnes desktop, 2 tablette, 1 mobile
- Chaque carte : fond surface, border gold/15, rounded-xl, p-8
- Hover : border gold/40, translateY(-4px), transition 300ms
- Icône : remplacer les emojis par une lettre stylisée ou un chiffre orné — OU garder l'emoji enveloppé dans un container rond gold/10

**Animation (ScrollTrigger) :**
- Header : fadeUp
- Cards : stagger 0.1s depuis y:50 opacity:0

---

## TÂCHE 5 — Flotte (3 Mercedes)
**Fichier :** `src/components/sections/Flotte.jsx`

**Layout :**
- Fond : `var(--surface)`
- 3 colonnes desktop, 1 mobile (carousel ou stack)
- Chaque carte :
  - Zone image (h-48) : gradient CSS `from-surface to-bg` + nom du modèle en grand Playfair gold en overlay + badge (Prestige / Business / Groupe)
  - Body : nom, description, passagers + bagages
  - Trait décoratif gold en bas de la zone image
- Hover : légère élévation + glow gold subtil (box-shadow)

**Animation (ScrollTrigger) :**
- Cards : stagger 0.15s fadeUp

---

## TÂCHE 6 — Zones
**Fichier :** `src/components/sections/Zones.jsx`

**Layout :**
- Fond : `var(--bg)`
- Tags pills en flex-wrap centré
- Chaque tag : border gold/30, texte gold, rounded-full, hover bg gold text dark

**Animation (ScrollTrigger) :**
- Tags : stagger 0.05s fade-in + scale 0.8→1

---

## TÂCHE 7 — Avis (témoignages)
**Fichier :** `src/components/sections/Avis.jsx`

**Layout :**
- Fond : `var(--surface)`
- 3 colonnes desktop, 1 mobile
- Chaque carte : guillemets stylisés gold en grand (Playfair 80px opacity:0.15), texte italic, nom + ville

**Animation (ScrollTrigger) :**
- Cards : stagger 0.12s fadeUp

---

## TÂCHE 8 — FAQ (accordéon)
**Fichier :** `src/components/sections/FAQ.jsx`

**Layout :**
- Fond : `var(--bg)`
- Max-width 720px, centré
- Chaque item : border-b gold/15, bouton full-width flex justify-between
- Réponse : hauteur 0 → auto avec GSAP (pas CSS height:auto qui ne s'anime pas — utiliser `gsap.set` + `getBoundingClientRect`)
- Icône + / − gold

**Animation :**
- Ouverture/fermeture accordéon : GSAP height + opacity, duration 0.4s, ease power2.inOut
- Items au scroll : stagger fadeUp

---

## TÂCHE 9 — Contact
**Fichier :** `src/components/sections/Contact.jsx`

**Layout :**
- Fond : `var(--surface)`
- 2 colonnes desktop (formulaire gauche, infos droite), 1 colonne mobile
- Formulaire : inputs fond bg, border gold/20, focus border gold, labels stone-muted
- Submit : bouton full-width gold, hover bg-gold-light
- Infos : cards avec icône + label + valeur (tel, email, adresse, horaires, licence)
- Bouton WhatsApp séparé : border green-500/40, texte vert

**Soumission :** `mailto:` comme en V1 (voir `data/content.js`)

**Animation (ScrollTrigger) :**
- Les deux colonnes : fadeUp avec délai 0.1s entre les deux

---

## TÂCHE 10 — Footer
**Fichier :** `src/components/layout/Footer.jsx`

**Layout :**
- Fond : `var(--bg)`, border-top gold/10
- Logo centré + tagline
- Liens tel + email
- Copyright
- Ligne décorative gold horizontale en top (1px, opacité 15%)

---

## TÂCHE 11 — index.html SEO
**Fichier :** `index.html`

Ajouter dans `<head>` :
```html
<title>Chauffeur Privé Aix-en-Provence | Provençal Coast Taxi VTC</title>
<meta name="description" content="Chauffeur privé et taxi à Aix-en-Provence. Transferts aéroport Marseille, voyages d'affaires, événements. Mercedes haut de gamme, tarifs fixes, 24h/24. Licence VTC N°013230073">
<meta name="keywords" content="chauffeur privé Aix-en-Provence, taxi VTC Aix, transfert aéroport Marseille, taxi Sainte-Victoire">
<link rel="canonical" href="https://provencalcoasttaxi.fr">
<meta property="og:title" content="Chauffeur Privé Aix-en-Provence | Provençal Coast Taxi VTC">
<meta property="og:description" content="Mercedes haut de gamme, tarifs fixes, disponible 24h/24. Aix-en-Provence et toute la région PACA.">
<meta property="og:url" content="https://provencalcoasttaxi.fr">
<meta property="og:type" content="website">
<meta name="robots" content="index, follow">
<meta name="geo.region" content="FR-13">
<meta name="geo.placename" content="Aix-en-Provence">
```

---

## TÂCHE 12 — Build final + vérifications
1. `npm run build` → zéro erreur, zéro warning
2. Vérifier que tous les liens (tel:, mailto:, wa.me) sont corrects
3. Vérifier responsive 375 / 768 / 1440
4. Vérifier que GSAP ScrollTrigger ne crash pas sur mobile
5. Vérifier que Lenis smooth scroll fonctionne sur desktop ET mobile
6. `npm run preview` → test final
