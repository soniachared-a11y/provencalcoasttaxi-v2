# Provençal Coast Taxi — Site V2

## 🎯 Objectif
Refonte complète de taxisprovencaleaix.fr. Design premium inspiration Provence / Montagne Sainte-Victoire, animations Awwwards-level (GSAP + Lenis), 100% responsive, SEO/GEO optimisé.

## 👤 Client
- **Nom** : Yassine Ouerfelli
- **Business** : Chauffeur privé VTC — Aix-en-Provence
- **Téléphone** : 06 15 96 32 75
- **Email** : provencalcoastdriver@gmail.com
- **Adresse** : 82 avenue Henri Mauriat, 13100 Aix-en-Provence
- **Licence VTC** : N°013230073
- **Domaine** : taxisprovencaleaix.fr (DNS Hostinger → repointer vers Vercel à la mise en ligne)
- **Deuxième marque** : taximalacrida.fr — même chauffeur, numéro : 07 84 62 86 40

## 🛠 Stack technique
- **Framework** : React 18 + Vite
- **Styles** : Tailwind CSS v4
- **Animations** : GSAP 3 + ScrollTrigger
- **Smooth scroll** : Lenis
- **Déploiement** : Vercel (compte Yassine)

## 📁 Architecture
```
src/
├── data/
│   └── content.js          → Toutes les données statiques (services, flotte, zones, avis, FAQ)
├── seo/
│   └── SchemaOrg.jsx       → JSON-LD TaxiService + LocalBusiness
├── hooks/
│   ├── useLenis.js          → Initialisation Lenis smooth scroll
│   └── useScrollReveal.js  → Hook GSAP ScrollTrigger réutilisable
├── utils/
│   └── animations.js       → Helpers GSAP (fadeUp, stagger, parallax)
├── components/
│   ├── layout/
│   │   ├── Nav.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx         → Fullscreen, parallax Sainte-Victoire, text reveal
│   │   ├── Atouts.jsx       → 4 cards animées au scroll
│   │   ├── Services.jsx     → Grid 6 services, stagger GSAP
│   │   ├── Flotte.jsx       → 3 véhicules Mercedes, hover 3D
│   │   ├── Zones.jsx        → Tags animés
│   │   ├── Avis.jsx         → Témoignages clients
│   │   ├── FAQ.jsx          → Accordéon animé
│   │   └── Contact.jsx      → Formulaire + infos
│   └── ui/
│       ├── ScrollReveal.jsx → Wrapper GSAP fade-in au scroll
│       ├── ParallaxLayer.jsx→ Couche parallax réutilisable
│       └── SaintVictoire.jsx→ Silhouette SVG de la montagne
└── App.jsx
```

## 🎨 Design System
Voir MEMORY.md → section Design Tokens

## 🚀 Commandes
```bash
npm run dev      # Développement local (port 5173)
npm run build    # Build production
npm run preview  # Preview du build
```

## 📋 Checklist déploiement
- [ ] npm run build sans erreur
- [ ] Lighthouse > 90 (perf, SEO, accessibilité)
- [ ] Responsive validé (375px / 768px / 1440px)
- [ ] Compte Vercel Yassine créé
- [ ] Deploy sur Vercel
- [ ] DNS Hostinger repointe → taxisprovencaleaix.fr
- [ ] GSC configuré + sitemap soumis
- [ ] Suppression 15 800 pages casino (GSC URL removal tool)
