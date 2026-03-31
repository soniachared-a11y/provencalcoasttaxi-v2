# GUIDE DE PILOTAGE V2 — Copier-coller dans Claude Code
> Pour Sonia. Chaque bloc = un copier-coller dans Claude Code.
> Thème : Light Provence. Typo : Instrument Serif + Sora. Palette : lavande + olive + bleu nuit.

---

## CONVERSATION 1 — Lecture + Setup + index.css

### Message 1 : Lecture du projet

```
Lis ces fichiers dans l'ordre, ne code rien encore :
1. MEMORY.md         → contenu client, données, contacts, design tokens résumé
2. DESIGN-SYSTEM.md  → tokens exacts, composants, règles, interdictions absolues
3. ANIMATIONS.md     → code GSAP exact par composant, Lenis setup
4. HOMEPAGE-LAYOUT.md → layout section par section avec contenu

Points clés à retenir :
- Stack : React 19 + Vite 8 + Tailwind CSS v4 + GSAP 3 + Lenis + Lucide React
- Thème : LIGHT provençal, fond crème #F6F3EE, jamais de fond sombre sauf Hero et Contact-info
- Typo display : Instrument Serif (weight 400, italic pour accents)
- Typo body : Sora (weights 300-700)
- CTA primaire : bleu nuit #3D5A80, carré (border-radius 0)
- Accents : lavande #8B6FA0 + olive #6B7D4A
- Icônes : Lucide React UNIQUEMENT — jamais d'emojis
- Border-radius : 0px partout (sauf avatars 50% et icône flottante 50%)
- Gradient : INTERDIT (sauf overlay Hero vidéo)
- Vidéo hero : public/hero-video.mp4 (déjà présent)

Dis-moi ce que tu as compris et confirme que tu es prêt.
```

### Message 2 : Nettoyage + index.css

```
Tâche : nettoyer et mettre à jour les fichiers de base.

1. src/index.css est DÉJÀ à jour (thème light, Instrument Serif + Sora). Vérifie qu'il est correct.

2. Mets à jour src/data/content.js :
   - Retirer TOUTES les emojis des icônes (icon: '✈️' etc.)
   - Remplacer par des noms d'icônes Lucide : icon: 'Plane', icon: 'Briefcase', etc.
   - Réduire SERVICES à 5 items (retirer "Transferts de Groupe", fusionner avec "Location à l'Heure" si besoin)
   - Ajouter le champ `image` à chaque service :
     01 Aéroport: '/images/classe-s-parking.jpg'
     02 Affaires: '/images/classe-s-interieur.jpg'
     03 Événements: '/images/flotte-chateau.jpeg'
     04 Longue Distance: '/images/classe-s-bastide.jpg'
     05 Touristique: '/images/lavande-provence.jpg'
   - Ajouter le champ `image` à chaque véhicule FLOTTE :
     Classe E: '/images/classe-e-provence.jpg'
     Classe S: '/images/classe-s-provence.jpg'
     Classe V: '/images/classe-v-provence.jpg'
   - Ajouter les données ZONES avec distance/durée/prix (voir MEMORY.md)
   - Mettre à jour ATOUTS avec les 4 compteurs (4.9, 24/7, 15min, 0€)
   - Retirer waHref du CONTACT (plus de WhatsApp)

3. Mets à jour src/utils/animations.js :
   - Remplacer toutes les références aux couleurs gold/or par les nouvelles (lavande, bleu)
   - Vérifier que les helpers fadeUp, staggerReveal, parallax sont fonctionnels

4. Exécute `npm run build` pour vérifier que tout compile.

Ne crée PAS de nouveaux composants. Mets juste à jour ces 3 fichiers.
```

---

## CONVERSATION 2 — Nav + Hero

### Message 3 : Nav

```
Code le composant Nav (src/components/Nav.jsx).

SPECS (voir HOMEPAGE-LAYOUT.md section 1) :
- Position fixed, z-100, pleine largeur, hauteur 72px desktop / 64px mobile
- Logo "Provençal Coast" en Instrument Serif 20px à gauche
- Liens au centre : Services, Flotte, Zones, Contact — Sora 11px tracking 0.06em
- À droite : CTA "Réserver" bleu nuit carré + icône Phone Lucide + numéro (masqué mobile)
- Mobile : hamburger (Menu Lucide) → drawer plein écran

COULEURS CONTEXTUELLES :
- État initial (sur Hero sombre) : texte blanc, logo blanc, liens rgba blanc 0.5
- Au scroll > 50px : fond rgba(246,243,238,0.95) + backdrop-blur(12px) + border-bottom --border + texte --texte
- Transition GSAP 0.3s (voir ANIMATIONS.md section NAV)

ANIMATIONS :
- Entrée : gsap.from y:-20, opacity:0, duration 0.6, power2.out, delay 0.1
- Scroll handler pour changer le fond

Importe les icônes Lucide nécessaires (Menu, X, Phone, ArrowRight).
Border-radius : 0 sur le CTA.
```

### Message 4 : Hero

```
Code le composant Hero (src/components/Hero.jsx).

SPECS (voir HOMEPAGE-LAYOUT.md section 2) :
- Plein écran (min-h-screen), position relative
- Fond : vidéo hero-video.mp4 en <video autoPlay muted loop playsInline> + overlay gradient sombre
- Contenu en bas-gauche (padding 60px) :
  1. Label Sora 10px uppercase tracking 0.3em rgba blanc 0.5
  2. H1 Instrument Serif 72px (40px mobile) weight 400 — 2 lignes :
     Ligne 1 : "L'élégance provençale" (blanc)
     Ligne 2 : "à votre service" (italic, rgba blanc 0.6) — utiliser <em>
  3. Ligne décorative : 48px × 1px lavande
  4. Sous-titre : Sora 14px 300 rgba blanc 0.6, max-width 400px
  5. 2 CTAs : btn-primary "Réserver →" (bleu nuit) + btn-secondary outline blanc "Voir les tarifs"

- Métriques haut-droit (3 blocs) :
  "4.9" / "Note Google", "24/7" / "Disponibilité", "10+" / "Ans d'expérience"
  Chiffre : Instrument Serif 36px blanc, Label : Sora 9px uppercase rgba blanc 0.35

ANIMATION HERO (voir ANIMATIONS.md section HERO) :
- Timeline séquentielle : label → H1 word-by-word → ligne → sous-titre → CTAs → métriques
- Technique word-reveal : chaque mot wrappé dans overflow-hidden > span
- Parallax vidéo : yPercent -10 scrub

N'oublie pas : border-radius 0 sur les CTAs. Pas d'emojis. Lucide icons uniquement.
```

---

## CONVERSATION 3 — Atouts + Services

### Message 5 : Atouts

```
Code le composant Atouts (src/components/Atouts.jsx).

SPECS (voir HOMEPAGE-LAYOUT.md section 3) :
- Fond : --cream
- Header : tag "NOS ATOUTS" lavande uppercase + H2 Instrument Serif 36px
- Grille 4 colonnes avec BORDURES FINES (pas de cards séparées)
  - Border extérieur : 1px solid --border
  - Séparateurs : border-right entre chaque cellule
  - Mobile : 2 colonnes
  - Chaque cellule : padding 48px 32px
    - Chiffre : Instrument Serif 48px lavande
    - Titre : Sora 13px 600
    - Description : Sora 12px --texte-light
  - Hover cellule : background --surface-alt

DONNÉES : 4.9 / Note Google, 24/7 / Disponibilité, 15min / Réponse, 0€ / Frais cachés

ANIMATION (ANIMATIONS.md) :
- gsap.from .atout-item y:30 opacity:0 stagger:0.1 power2.out, ScrollTrigger top 82% once
- CountUp sur les chiffres

Pas de border-radius. Pas de shadow. Style éditorial épuré.
```

### Message 6 : Services (Expanding Strips)

```
Code le composant Services (src/components/Services.jsx).

C'EST LE COMPOSANT CLÉ — Expanding strips horizontaux.

SPECS (voir HOMEPAGE-LAYOUT.md section 4) :
- Fond : --cream
- Header : tag + H2
- Conteneur : 5 strips côte à côte, flex, hauteur 480px (360px mobile), gap 3px

CHAQUE STRIP :
- Photo background (VRAIES PHOTOS dans public/images/ — voir HOMEPAGE-LAYOUT.md section "Photos par strip")
- Overlay gradient sombre vers le bas
- État fermé (flex: 1) :
  - Numéro en petit (Sora 14px rgba blanc 0.4)
  - Titre en vertical (writing-mode: vertical-rl, Instrument Serif 16px blanc)
- État ouvert (flex: 5, le strip cliqué) :
  - Barre accent lavande 2px à gauche, height 0→100% (transition 0.6s)
  - Photo background scale 1.05
  - Numéro "01 / 05"
  - Titre Instrument Serif 32px blanc
  - Description Sora 13px rgba blanc 0.65
  - Tags : bordure rgba blanc 0.15, backdrop-blur, Sora 9px uppercase
  - CTA : ligne lavande 32px + "Réserver" uppercase

TRANSITION CLÉ : flex change en 0.7s cubic-bezier(0.76, 0, 0.24, 1)
Contenu fermé → opacity 0 quand actif, contenu ouvert → opacity 1 avec delay 0.2s

5 SERVICES : Transfert Aéroport, Déplacement Affaires, Événements, Longue Distance, Visite Touristique
Données + images dans content.js (champ `image` par service).

useState pour tracker le strip actif (default: 0).
```

---

## CONVERSATION 4 — Flotte + Zones

### Message 7 : Flotte

```
Code le composant Flotte (src/components/Flotte.jsx).

SPECS (HOMEPAGE-LAYOUT.md section 5) :
- Fond : --surface (blanc)
- Header : tag + H2 "Mercedes haut de gamme"
- Grille 3 colonnes avec bordures (même style éditorial que Atouts)
  - Border extérieur 1px, border-right entre colonnes
  - Mobile : stack vertical
- Par colonne :
  - Zone photo 200px (VRAIES PHOTOS : classe-e-provence.jpg, classe-s-provence.jpg, classe-v-provence.jpg dans public/images/)
  - Nom : Instrument Serif 24px
  - Classe : Sora 10px uppercase --lavande
  - Specs : lignes clé-valeur (Passagers, Bagages, Feature) avec border-bottom fines
- Modèle phare (Classe S) : border-top 2px --lavande

3 véhicules : Classe E, Classe S (phare), Classe V. Données + images dans content.js.
Photos : /images/classe-e-provence.jpg, classe-s-provence.jpg, classe-v-provence.jpg
Animation : stagger 0.15 (voir ANIMATIONS.md)
```

### Message 8 : Zones

```
Code le composant Zones (src/components/Zones.jsx).

SPECS (HOMEPAGE-LAYOUT.md section 6) :
- Fond : --cream
- Header : tag + H2
- Grid 2 colonnes (1.2fr | 0.8fr), border 1px --border, overflow hidden
- Colonne gauche : zone carte (SVG SaintVictoire.jsx ou image vignes-provence.jpg)
- Colonne droite : liste interactive
  - Items empilés, border-bottom entre chaque
  - Destination : Instrument Serif 18px
  - Meta : distance + durée + prix olive
  - Hover/active : barre verticale lavande 2px à gauche + background --surface-alt
  - Padding 28px 32px

useState pour item actif (highlight sur la carte à terme).
Mobile : stack vertical.
Animation : entrée + items stagger x:20 (voir ANIMATIONS.md)
```

---

## CONVERSATION 5 — Avis + FAQ

### Message 9 : Avis

```
Code le composant Avis (src/components/Avis.jsx).

SPECS (HOMEPAGE-LAYOUT.md section 7) :
- Fond : --cream
- Header : tag + H2

BLOC 1 — Avis principal (grande citation) :
- Border-top + border-bottom 1px --border, padding 64px 0
- Guillemet " : Instrument Serif 120px, --lavande opacity 0.12, position absolute top-left
- Texte : Instrument Serif italic 36px (24px mobile), --texte, max-width 800px
- Auteur en dessous :
  - Avatar cercle 44px (initiales, background gradient lavande→olive) — SEULE exception border-radius 50%
  - Nom : Sora 13px 600
  - Détail : Sora 11px --texte-light
  - Étoiles : ★★★★★ --lavande, alignées à droite
- Optionnel : rotation auto toutes les 6s avec GSAP fade (voir ANIMATIONS.md)

BLOC 2 — Marquee horizontal :
- Border-top 1px --border, padding 20px 0
- CSS animation translateX infinite 30s linear
- Contenu dupliqué 2x (pour boucle infinie)
- Chaque item : étoiles --lavande + citation Instrument Serif italic 15px + nom
- Séparateurs : cercles 4px --border
- Pause au hover
- aria-hidden="true" (contenu décoratif)
```

### Message 10 : FAQ

```
Code le composant FAQ (src/components/FAQ.jsx).

SPECS (HOMEPAGE-LAYOUT.md section 8) :
- Fond : --surface (blanc)
- Header : tag + H2 "Questions fréquentes"
- Container max-width 800px centré
- Items empilés, border-bottom 1px --border entre chaque
- Question : Sora 15px 600, --texte, padding 24px 0
- Icône : ChevronRight Lucide, rotation 90° quand ouvert (GSAP rotate)
- Réponse : Sora 14px 300, --texte-light, line-height 1.7
- Animation ouverture/fermeture : GSAP height auto (voir ANIMATIONS.md section FAQ)
- Un seul item ouvert à la fois
- Aria : aria-expanded, aria-controls sur chaque item
```

---

## CONVERSATION 6 — Contact + Footer + Flottant

### Message 11 : Contact

```
Code le composant Contact (src/components/Contact.jsx).

SPECS (HOMEPAGE-LAYOUT.md section 9) :
- Grid 2 colonnes (0.5fr | 1fr), border 1px --border
- Mobile : stack

COLONNE GAUCHE — Infos (fond sombre) :
- Background : --texte (#2A2A2A), padding 48px
- Titre : Instrument Serif 28px blanc
- Blocs info (Téléphone, Email, Zone) :
  Label : Sora 9px uppercase tracking 0.2em rgba blanc 0.35
  Valeur : Sora 14px rgba blanc 0.8
- Pied : "Licence VTC — SIRET..." Sora 10px rgba blanc 0.25

COLONNE DROITE — Formulaire :
- Background : --surface, padding 48px
- Champs : Nom + Téléphone (2 colonnes), Service, Date, Message (textarea)
- Style inputs : underline seulement (border-bottom 1px --border), pas de bordure complète
- Labels : Sora 9px uppercase au-dessus, --texte-light
- Focus : border-bottom --lavande
- CTA : btn-primary "Envoyer la demande →"

Animation : split reveal GSAP (voir ANIMATIONS.md)
```

### Message 12 : Footer + Icône téléphone

```
Code le composant Footer (src/components/Footer.jsx) et l'icône téléphone flottante.

FOOTER :
- Fond : --texte (#2A2A2A), padding 48px 0
- 3 colonnes : logo+desc | liens rapides | infos contact
- Mobile : stack
- Texte : rgba blanc 0.6, liens hover blanc
- Copyright + "Made with ♥ in Provence"

ICÔNE TÉLÉPHONE FLOTTANTE (dans App.jsx ou composant dédié) :
- Position fixed, bottom 24px, right 24px, z-index 999
- Cercle 56px, background --bleu (#3D5A80), border-radius 50%
- Icône : Phone Lucide 24px stroke blanc stroke-width 2
- Shadow : 0 4px 20px rgba(61,90,128,0.3)
- Hover : scale 1.1, shadow intensifié
- Lien : <a href="tel:+33615963275">
- Entrée : GSAP scale 0→1 delay 2s back.out(2)
- Pulse subtil continu optionnel (voir ANIMATIONS.md)
```

---

## CONVERSATION 7 — Build + Vérification

### Message 13 : Build final

```
1. Vérifie que App.jsx importe tous les composants dans le bon ordre :
   Nav, Hero, Atouts, Services, Flotte, Zones, Avis, FAQ, Contact, Footer

2. Exécute npm run build — corrige toutes les erreurs.

3. Exécute npm run preview et vérifie visuellement :
   - Le thème est LIGHT (fond crème, pas sombre)
   - La typo est Instrument Serif + Sora (pas Playfair + Inter)
   - Les CTA sont CARRÉS et BLEU NUIT (pas ronds, pas gold)
   - Les icônes sont Lucide (pas d'emojis)
   - L'icône flottante est un téléphone bleu nuit (pas WhatsApp vert)
   - Les strips services s'expandent au clic et montrent les VRAIES photos
   - La section Flotte affiche les 3 photos Mercedes (Sainte-Victoire)
   - Le marquee avis défile horizontalement
   - La nav change de couleur au scroll
   - Les images chargent correctement (pas de broken images)

4. Lighthouse audit : score > 90 sur Performance, Accessibility, Best Practices, SEO.

5. Liste tous les problèmes trouvés pour correction.
```
