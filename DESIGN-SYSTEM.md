# DESIGN SYSTEM — Provençal Coast Taxi V2
> Standard Awwwards. Thème lumineux provençal. Chaque décision justifiée.

---

## COULEURS

### Palette principale
```css
/* Fonds */
--cream:        #F6F3EE   /* Fond principal — crème chaud, pas blanc froid */
--surface:      #FFFFFF   /* Cards, sections alternées, formulaires */
--surface-alt:  #FAF8F5   /* Hover states, éléments actifs, fond secondaire */

/* Accents — touches de couleur, jamais dominantes */
--lavande:      #8B6FA0   /* Accent principal — labels, liens actifs, étoiles, accents */
--olive:        #6B7D4A   /* Accent secondaire — prix, badges, tags, nature */
--bleu:         #3D5A80   /* CTA primaire — bleu nuit, confiance, action */

/* Texte */
--texte:        #2A2A2A   /* Titres, texte principal — quasi-noir chaud */
--texte-light:  #888888   /* Texte secondaire, descriptions, placeholders */
--texte-faint:  #BBBBBB   /* Texte tertiaire, meta, numéros de section */

/* Structure */
--border:       #E8E4DE   /* Bordures, séparateurs, lignes de grille */
--border-hover: #D0C8BE   /* Bordures au hover */
```

### Règles d'usage
- **Fond principal** → `--cream` (#F6F3EE) uniquement
- **Sections alternées** → alterner `--cream` et `--surface` (jamais deux identiques de suite)
- **Lavande** → labels de section, étoiles avis, liens actifs, accents de barre verticale — max 15% de surface visible
- **Olive** → prix, tags, badges nature, éléments de confiance
- **Bleu nuit** → CTA primaire uniquement + icône téléphone flottant. Jamais en texte courant.
- **Blanc pur (#FFF)** → seulement pour `--surface` (cards). Jamais en texte.
- **Noir pur (#000)** → JAMAIS. Utiliser `--texte` (#2A2A2A)
- **Contraste minimum** → 4.5:1 pour texte (WCAG AA). Vérifié : #2A2A2A sur #F6F3EE = 10.8:1
- **Gradient** → INTERDIT partout. Couleurs solides uniquement.
- **Border-radius** → 0px par défaut (carrés nets). Exceptions : avatars (50%), icône flottante (50%).

---

## TYPOGRAPHIE

### Familles
```css
--font-display: 'Instrument Serif', Georgia, 'Times New Roman', serif
--font-body:    'Sora', system-ui, -apple-system, sans-serif
```

### Import Google Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500;600;700&display=swap');
```

### Hiérarchie typographique
| Élément | Famille | Taille desktop | Taille mobile | Poids | Couleur | Usage |
|---------|---------|---------------|---------------|-------|---------|-------|
| H1 hero | Instrument Serif | 72px | 40px | 400 | `--texte` + `--lavande` (em) | Hero uniquement, une seule fois |
| H2 section | Instrument Serif | 36px | 28px | 400 | `--texte` | Un par section, titres principaux |
| H3 composant | Instrument Serif | 24px | 20px | 400 | `--texte` | Noms de véhicules, destinations, titres de services |
| H4 sous-composant | Instrument Serif | 18px | 16px | 400 | `--texte` | Titres dans les cards, accordéons |
| Label section | Sora | 10px | 10px | 600 | `--lavande` | Au-dessus des H2, UPPERCASE, tracking 0.25em |
| Body | Sora | 14px | 14px | 300-400 | `--texte-light` | Paragraphes, descriptions |
| Small | Sora | 12px | 12px | 400 | `--texte-light` | Specs, meta, sous-titres |
| Caption | Sora | 9-10px | 9px | 500-600 | `--texte-faint` | Numéros de strip, labels formulaire |
| CTA button | Sora | 11px | 11px | 600 | variable | Boutons, UPPERCASE, tracking 0.12em |
| Nav links | Sora | 11-12px | 14px | 400 | variable | Navigation, tracking 0.06em |
| Téléphone | Instrument Serif | 22px | 18px | 400 | `--lavande` | Dans la nav et les infos contact |

### Règles typographiques
- **Line-height** : Instrument Serif titres → 0.95-1.1, Sora body → 1.6-1.7
- **Letter-spacing** : Instrument Serif → 0 (naturel), labels uppercase → 0.2-0.25em, Sora body → 0
- **Max-width texte** : 560px pour les paragraphes (lisibilité optimale)
- **UPPERCASE** → seulement les labels (10px), tags, et boutons. Jamais les grands titres.
- **Italique** → Instrument Serif italic pour la ligne d'accent dans le H1 hero + citations avis
- **Instrument Serif poids 400** → toujours. Pas de bold sur cette font — son contraste naturel suffit.

---

## ESPACEMENTS (système 8px)

```
4px   → micro-espaces (gap interne icon/text)
8px   → espaces intra-composants
12px  → gap minimal entre éléments
16px  → padding interne mobile, gap standard
24px  → gap entre éléments liés, padding
32px  → padding composants desktop, gap grilles
40px  → padding strips expanded
48px  → marge entre header section et contenu
60px  → padding hero content
80px  → fin de section, espaces de respiration
100px → section padding vertical desktop
```

### Application Tailwind
```
py-16 = 64px  → sections compactes mobile
py-[100px]    → sections standard desktop
px-6  = 24px  → padding horizontal mobile
px-8  = 32px  → padding horizontal desktop
max-w-[1200px] mx-auto → container
```

---

## COMPOSANTS

### Boutons (CTA)
```
Primaire (bleu nuit) :
  bg: --bleu (#3D5A80) | text: #FFFFFF | font: Sora 600 11px uppercase tracking 0.12em
  padding: 16px 32px | border-radius: 0px (carré)
  hover: bg #345070 + translateY(-1px)
  transition: all 300ms ease
  Contenu: texte + flèche → (ex: "Réserver →")

Secondaire (outline lavande) :
  bg: transparent | border: 1.5px solid --lavande | text: --lavande
  padding: 16px 32px | border-radius: 0px
  hover: bg rgba(139,111,160,0.06) + border-color intensifié
  transition: all 300ms ease

Ghost (lavande 6%) :
  bg: rgba(139,111,160,0.06) | text: --lavande
  padding: 16px 32px | border-radius: 0px
  hover: bg rgba(139,111,160,0.12)
  Pas de border

Lien texte (olive) :
  bg: transparent | text: --olive
  text-decoration: underline | text-underline-offset: 4px
  hover: opacity 0.8
```

### Icône téléphone flottante
```
Position: fixed | bottom: 24px | right: 24px | z-index: 999
Taille: 56x56px | border-radius: 50% (exception)
Background: --bleu (#3D5A80)
Icône: Lucide Phone (24x24, stroke #fff, stroke-width 2)
Shadow: 0 4px 20px rgba(61,90,128,0.3)
Hover: scale(1.1) + shadow 0 6px 28px rgba(61,90,128,0.4)
Transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease
Lien: tel:+33615963275
```

### Tags / Pills
```
Border: 1px solid rgba(255,255,255,0.15) (sur fond sombre) OU --border (sur fond clair)
Background: rgba(255,255,255,0.12) + backdrop-filter blur(4px) (sombre) OU rgba(107,125,74,0.08) (clair)
Text: Sora 9-10px, uppercase, tracking 0.08em, font-weight 500
Padding: 6px 14px
Border-radius: 0px (carré)
```

### Inputs formulaire
```
Style: underline seulement (pas de bordure complète)
Border-bottom: 1px solid --border
Background: transparent
Padding: 14px 0
Font: Sora 14px 400, color --texte
Placeholder: --texte-light
Focus: border-color --lavande
Label: au-dessus, Sora 9px 600 uppercase tracking 0.15em color --texte-light
Transition: border-color 300ms ease
```

### Grilles à bordures (Atouts, Flotte)
```
Style éditorial — pas de cards séparées, mais une grille avec bordures fines
Border: 1px solid --border
Cellules: border-right 1px solid --border (sauf dernière)
Hover cellule: background --surface-alt
Pas de border-radius, pas de shadow
```

### Séparateurs de sections
```
Option A : border-top: 1px solid --border — entre chaque section
Option B : Changement de fond --cream / --surface suffit
JAMAIS de ligne décorative épaisse ou colorée
```

---

## ICÔNES

### Bibliothèque : Lucide React
```
Import: import { Plane, Briefcase, Clock, Users, Trophy, MapPin, Phone, Star, ChevronRight, ArrowRight } from 'lucide-react'
Taille standard: 20-24px
Stroke: currentColor | stroke-width: 1.5
Style: ligne fine, minimal, cohérent
```

### Mapping services → icônes Lucide
| Service | Icône Lucide | Usage |
|---------|-------------|-------|
| Transfert Aéroport | `Plane` | Strips, side panel |
| Voyages d'Affaires | `Briefcase` | Strips, side panel |
| Location à l'Heure | `Clock` | Strips, side panel |
| Événements Privés | `PartyPopper` ou `Wine` | Strips, side panel |
| Transferts Groupe | `Users` | Strips, side panel |
| Service VIP | `Crown` ou `Shield` | Strips, side panel |
| Téléphone | `Phone` | Flottant, contact |
| Étoiles avis | `Star` | Section avis |
| Flèche CTA | `ArrowRight` | Boutons |
| Navigation | `Menu`, `X` | Nav mobile |

### INTERDICTION ABSOLUE
- Jamais d'emojis (🚗✈️💼🥂) — uniquement Lucide React
- Jamais d'icônes remplies (fill) — toujours stroke
- Jamais d'icônes colorées individuellement — toujours currentColor

---

## VISUELS & ARRIÈRE-PLANS

### Hero
```
Background: vidéo hero-video.mp4 en plein écran
Overlay: gradient sombre progressif
  linear-gradient(to bottom, rgba(42,42,42,0.2) 0%, rgba(42,42,42,0.7) 100%)
Fallback (pas de vidéo): dégradé chaud
  linear-gradient(135deg, #3a3530, #2a2520)
```

### Sections avec photo parallax (fond Provence)
```
Quand photos fournies par client:
  background-size: cover
  background-position: center
  background-attachment: fixed (parallax CSS) OU GSAP ScrollTrigger scrub
  Overlay: rgba(246,243,238,0.85) pour garder le fond crème lisible
```

### SVG Sainte-Victoire
```
Position: decorative, en bas du Hero ou en séparateur
Couleur: rgba(139,111,160,0.06) — très subtile
Parallax: yPercent -15 scrub GSAP
Mobile: opacity réduite ou masquée
```

### Règle des espaces vides
- Espaces vides = luxe et confiance
- Ratio signal/bruit élevé — chaque élément justifie sa présence
- Sections courtes avec beaucoup d'air > sections surchargées

---

## INTERDICTIONS ABSOLUES

1. **Jamais de gradient** sur les boutons ou backgrounds (sauf overlay hero)
2. **Jamais de border-radius > 0** sauf avatars (50%) et icône flottante (50%)
3. **Jamais d'emojis** — Lucide React uniquement
4. **Jamais de box-shadow colorée** sur les textes
5. **Jamais de blanc pur** (#FFF) en texte
6. **Jamais de noir pur** (#000)
7. **Jamais de font-size < 9px** (accessibilité)
8. **Jamais de `!important`** dans le CSS
9. **Jamais d'animations > 1s** sauf intro Hero
10. **Jamais de hover uniquement** sans état focus (accessibilité clavier)
11. **Jamais de placeholder comme label** — labels toujours visibles
12. **Jamais d'or/gold** (#C9A84C, #E8C97A) — ancien thème, supprimé
13. **Jamais de fond sombre** (#0A0806, #141009) — ancien thème, supprimé
14. **Jamais de Playfair Display ou Inter** — remplacés par Instrument Serif + Sora

---

## ACCESSIBILITÉ (WCAG AA minimum)

- Contraste texte corps : ≥ 4.5:1 (vérifié: #2A2A2A sur #F6F3EE = 10.8:1)
- Contraste texte grand : ≥ 3:1 (vérifié: #888888 sur #F6F3EE = 3.5:1)
- Contraste CTA : ≥ 4.5:1 (vérifié: #FFFFFF sur #3D5A80 = 6.2:1)
- Focus visible : `outline: 2px solid --lavande; outline-offset: 4px`
- Attributs `alt` sur toutes les images
- Rôles ARIA : nav, main, footer, section
- Bouton hamburger : `aria-label="Menu"`, `aria-expanded`
- Formulaire : labels associés via `htmlFor`, messages d'erreur aria-live
- FAQ accordéon : `aria-expanded`, `aria-controls`
- Strips services : `role="tablist"` + `role="tab"` + `aria-selected`
- Marquee avis : `aria-hidden="true"` (décoratif, contenu repris dans l'avis principal)
