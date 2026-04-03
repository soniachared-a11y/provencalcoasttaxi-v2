# DECISIONS — Provençal Coast Taxi V2
> Pourquoi on a fait quoi. Référence pour les futures sessions.

---

## Architecture

**Décision : Composants séparés (pas un seul App.jsx monolithique)**
→ La V1 avait tout dans un seul fichier. Intenable à maintenir.
→ Chaque section = son propre fichier dans `sections/`
→ Les données = `data/content.js` (un seul point de vérité)
→ Les animations = `utils/animations.js` (réutilisables, pas dupliquées)

**Décision : Tailwind CSS v4 (pas v3)**
→ Meilleure performance, moins de config, compatible Vite natif
→ Design tokens dans `index.css` via `@theme`

---

## Design

**Décision : Thème sombre + or (garder de la V1)**
→ Le client a validé visuellement ce thème
→ On l'élève : fond légèrement chaud (#0A0806 vs #0A0A0A), typographie serif

**Décision : Playfair Display pour les titres**
→ Connotation luxe, chic, provençal
→ Inter reste pour le corps — lisibilité mobile
→ Alternative si Playfair trop lourd : Cormorant Garant

**Décision : Silhouette Sainte-Victoire en SVG (pas image)**
→ Pas de photos disponibles pour l'instant
→ SVG = léger, scalable, animable avec GSAP
→ Couleur très subtile (6% opacité or) — décoratif pas distrayant

**Décision : Pas de section dédiée taximalacrida.fr**
→ Le site est taxisprovencaleaix.fr
→ Malacrida sera uniquement dans le dashboard (back-office)
→ On ne mélange pas les deux marques sur le site public

---

## Animations

**Décision : Lenis + GSAP (pas CSS animations seules)**
→ Niveau Awwwards demandé par la cliente
→ Lenis = smooth scroll premium (pas de jerky scroll natif)
→ GSAP ScrollTrigger = contrôle précis des animations au scroll
→ Performance : animations sur `transform` et `opacity` uniquement (GPU)

**Décision : Pas de Three.js pour cette version**
→ Sainte-Victoire en SVG suffit pour l'effet visuel
→ Three.js = surcharge pour un site taxi, impact perf Lighthouse
→ Possible en V3 si client veut aller encore plus loin

**Décision : Formulaire contact → mailto: (pas de backend)**
→ Simple, zéro infrastructure
→ Yassine reçoit directement sur provencalcoastdriver@gmail.com
→ Upgrade vers EmailJS possible si besoin sans refonte

---

## SEO/GEO

**Décision : Garder les 10 pages SEO locales**
→ Déjà soumises dans GSC pour taximalacrida
→ Même stratégie pour provencalcoasttaxi
→ Chaque page = une ville ou un service spécifique

**Décision : Schema.org TaxiService + LocalBusiness**
→ Double type pour maximiser la visibilité Google
→ + hint GEO pour ChatGPT/Gemini/Perplexity

---

## Déploiement

**Décision : Vercel (compte Yassine, pas celui de Sonia)**
→ Yassine doit être propriétaire de ses actifs digitaux
→ Sonia garde les droits de déploiement via invitation collaborateur
→ DNS Hostinger repointe vers Vercel le jour J
