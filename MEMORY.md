# MEMORY — Provençal Coast Taxi V2
> Fichier de référence permanent. TOUJOURS lire avant de coder.

---

## CONTENU DU SITE

### Données de contact
```
TEL       = '06 15 96 32 75'
TEL_HREF  = 'tel:+33615963275'
EMAIL     = 'provencalcoastdriver@gmail.com'
ADRESSE   = '82 avenue Henri Mauriat, 13100 Aix-en-Provence'
LICENCE   = 'N°013230073'
```
Note : pas de WhatsApp. Bouton flottant = téléphone direct.

### Services (5 strips)
1. Transfert Aéroport — Suivi de vol, panneau nominatif, tarif fixe
2. Déplacement Affaires — Discrétion, Wi-Fi, mise à disposition demi/journée
3. Événements & Soirées — Mariages, galas, aller-retour, attente incluse
4. Longue Distance — Nice, Lyon, Monaco, France entière
5. Visite Touristique — Gordes, Roussillon, Cassis, itinéraires sur mesure

### Flotte (3 véhicules)
| Modèle | Type | Passagers | Bagages | Feature |
|--------|------|-----------|---------|---------|
| Mercedes Classe E | Berline confort | 3 | 3 | Wi-Fi |
| Mercedes Classe S | Premium (phare) | 3 | 3 | Sièges massants |
| Mercedes Classe V | Van premium | 7 | 7 | Idéal groupes |

### Zones desservies (principales avec prix)
| Destination | Durée | Distance | Prix |
|-------------|-------|----------|------|
| Aéroport Marseille | 35 min | 42 km | dès 65€ |
| Gare TGV Aix | 15 min | 12 km | dès 25€ |
| Aéroport Nice | 2h | 180 km | dès 220€ |
| Cassis / Calanques | 45 min | 50 km | dès 75€ |
| Gordes / Luberon | 1h | 65 km | dès 90€ |

### Avis clients (3 + marquee)
- Sophie L. (Aix-en-Provence) — Service impeccable, chauffeur ponctuel, trajet aéroport sérénité
- Marc D. (Marseille) — V-Class famille, confort espace sécurité, haut de gamme
- Claire P. (Avignon) — Réservation simple, support 24/7, trajets pro facilités

### Atouts (4 compteurs)
| Chiffre | Titre | Description |
|---------|-------|-------------|
| 4.9 | Note Google | +200 avis 5 étoiles vérifiés |
| 24/7 | Disponibilité | Réservation à toute heure, 365j/an |
| 15min | Temps de réponse | Confirmation garantie |
| 0€ | Frais cachés | Tarif fixe annoncé = tarif payé |

### FAQ (5 questions)
1. Comment réserver ? → Formulaire / téléphone 06 15 96 32 75 — 24h/24
2. Tarifs fixes ? → Oui, prix confirmé à la réservation, aucune surprise
3. Vol retardé ? → Suivi vols temps réel, ajustement automatique
4. Quelle flotte ? → S-Class, E-Class, V-Class — récents, haut de gamme
5. Disponible la nuit ? → Oui, 24h/24 7j/7

---

## DESIGN TOKENS

### Palette (Provence Light Theme)
```css
--cream:        #F6F3EE   /* Fond principal */
--surface:      #FFFFFF   /* Cards, sections alternées */
--surface-alt:  #FAF8F5   /* Hover, fond secondaire */
--lavande:      #8B6FA0   /* Accent principal */
--olive:        #6B7D4A   /* Accent secondaire */
--bleu:         #3D5A80   /* CTA primaire */
--texte:        #2A2A2A   /* Texte principal */
--texte-light:  #888888   /* Texte secondaire */
--border:       #E8E4DE   /* Bordures */
```

### Typographie
- **Display** : Instrument Serif (serif, italic pour accents)
- **Body** : Sora (sans-serif, weights 300-700)
- H1: 72px/40px mobile, weight 400
- H2: 36px/28px mobile, weight 400
- Body: 14px, weight 300-400
- Labels: 10px, weight 600, uppercase, tracking 0.25em

### Composants clés
- **CTA** : bleu nuit #3D5A80, carré (radius 0), Sora 11px 600 uppercase
- **Bouton flottant** : téléphone, cercle bleu nuit, Lucide Phone, position fixe bas-droit
- **Border-radius** : 0px partout (sauf avatars et icône flottante)
- **Icônes** : Lucide React — jamais d'emojis
- **Gradient** : INTERDIT (sauf overlay hero vidéo)

---

## ANIMATIONS — RÉSUMÉ

### Lenis (smooth scroll)
- Initialisation dans `hooks/useLenis.js`
- Durée : 1.2s, connecté à GSAP ticker

### Patterns GSAP standards
```
fadeUp:    y:60→0, opacity:0→1, power3.out, ScrollTrigger start 85%
stagger:   même + stagger 0.1-0.15, start 80%
parallax:  yPercent -10 à -20, scrub, ease none
countUp:   textContent 0→N, power2.out, snap
```

### Par section
- **Hero** : séquence word-reveal + métriques stagger (voir ANIMATIONS.md)
- **Atouts** : fadeUp stagger + countUp chiffres
- **Services** : entrée fadeUp + expansion CSS cubic-bezier(0.76,0,0.24,1)
- **Flotte** : stagger 0.15
- **Zones** : entrée + items stagger x:20
- **Avis** : fadeUp citation + marquee CSS infinite
- **FAQ** : accordéon GSAP height auto
- **Contact** : split reveal x:-40/x:40
- **Téléphone** : scale bounce après 2s

---

## FICHIERS DE RÉFÉRENCE

| Fichier | Contenu |
|---------|---------|
| `DESIGN-SYSTEM.md` | Tokens, composants, règles, interdictions |
| `ANIMATIONS.md` | Code GSAP exact par composant |
| `HOMEPAGE-LAYOUT.md` | Layout section par section avec contenu |
| `COPY-MARKETING.md` | Textes marketing par section |
| `RESPONSIVE.md` | Breakpoints et règles responsive |
| `src/data/content.js` | Données statiques (à mettre à jour) |
| `src/index.css` | CSS tokens + reset |
| `src/hooks/useLenis.js` | Smooth scroll Lenis |
| `src/utils/animations.js` | Helpers GSAP (à mettre à jour) |

---

## STACK TECHNIQUE

- React 19 + Vite 8
- Tailwind CSS v4
- GSAP 3 + ScrollTrigger
- Lenis (smooth scroll)
- Lucide React (icônes)
- Déploiement : Vercel

---

## POINTS D'ATTENTION

1. CSS `@import` Google Fonts DOIT être AVANT `@tailwind` dans index.css
2. Lenis + GSAP : connecter via `gsap.ticker.add(time => lenis.raf(time * 1000))`
3. `ScrollTrigger.refresh()` après initialisation Lenis
4. Vite config : `base: './'` pour preview local (retirer pour Vercel)
5. IMAGES DISPONIBLES dans `public/images/` — 14 photos réelles (Mercedes + Provence). Voir HOMEPAGE-LAYOUT.md section "INVENTAIRE IMAGES" pour le mapping complet section→photo
6. Video hero : `public/hero-video.mp4` (4MB, déjà présent), fallback image : `/images/mercedes-motion.jpeg`
7. SVG Sainte-Victoire : `components/ui/SaintVictoire.jsx` (déjà créé, adapter couleur)
8. content.js : à mettre à jour (retirer emojis, adapter services à 5, ajouter zones avec prix, ajouter chemins images par service/véhicule)
