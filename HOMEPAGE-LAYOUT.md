# HOMEPAGE LAYOUT — Section par section
> Chaque section décrite avec son layout, son contenu, ses interactions. Référence pour Claude Code.

---

## ORDRE DES SECTIONS
```
1. Nav (fixe)
2. Hero (full-screen, fond sombre)
3. Atouts (grille compteurs)
4. Services (expanding strips)
5. Flotte (tableau éditorial)
6. Zones (carte + liste)
7. Avis (grande citation + marquee)
8. FAQ (accordéon)
9. Contact (split dark/light)
10. Footer
11. Icône téléphone flottante (fixe, toujours visible)
```

---

## 1. NAV

### Layout
```
Position: fixed top, z-index 100, width 100%
Fond initial: transparent (sur Hero sombre)
Fond au scroll: rgba(246,243,238,0.95) + backdrop-blur(12px) + border-bottom 1px --border
Contenu: logo à gauche | liens au centre | CTA + tel à droite
Hauteur: 72px desktop, 64px mobile
```

### Contenu
```
Logo: "Provençal Coast" en Instrument Serif 20px
Liens: Services, Flotte, Zones, Contact — Sora 11px tracking 0.06em
CTA: "Réserver" — btn-primary (bleu nuit, carré)
Tél: icône Phone Lucide + numéro (masqué mobile, visible desktop)
Mobile: hamburger → drawer plein écran
```

### Couleurs contextuelles
```
Sur Hero (sombre): texte blanc, logo blanc, CTA outline blanc
Sur sections claires (après scroll): texte --texte, logo --texte, CTA bleu nuit
Transition: GSAP 0.3s au scroll > 50px
```

---

## 2. HERO

### Layout
```
Hauteur: 100vh min
Fond: vidéo hero-video.mp4 plein écran + overlay gradient sombre
Fallback image: /images/mercedes-motion.jpeg (si vidéo lente à charger)
Position contenu: bas-gauche (padding 60px)
Position métriques: haut-droit (3 métriques verticales)
```

### Contenu bas-gauche
```
1. Label: "CHAUFFEUR PRIVÉ — AIX-EN-PROVENCE" — Sora 10px uppercase tracking 0.3em, rgba(255,255,255,0.5)
2. H1: "L'élégance provençale" (ligne 1, blanc) + "à votre service" (ligne 2, italic, rgba blanc 0.6)
   Font: Instrument Serif 72px (40px mobile), weight 400
3. Ligne décorative: 48px × 1px, couleur --lavande
4. Sous-titre: 14px Sora 300, rgba blanc 0.6, max-width 400px
5. CTAs: btn-primary "Réserver →" + btn-secondary outline "Voir les tarifs"
```

### Métriques haut-droit
```
3 blocs empilés verticalement, alignés à droite:
  - "4.9" + "Note Google"
  - "24/7" + "Disponibilité"
  - "10+" + "Ans d'expérience"
Chiffre: Instrument Serif 36px blanc
Label: Sora 9px uppercase tracking 0.15em, rgba blanc 0.35
```

### Animation
Voir ANIMATIONS.md → section HERO

---

## 3. ATOUTS

### Layout
```
Fond: --cream
Structure: grille 4 colonnes avec bordures fines (pas de cards)
Border extérieur: 1px solid --border
Séparateurs: border-right 1px solid --border entre chaque cellule
Mobile: 2 colonnes
```

### Contenu par cellule
```
1. Chiffre: Instrument Serif 48px, couleur --lavande
2. Titre: Sora 13px 600, --texte
3. Description: Sora 12px, --texte-light
Padding: 48px 32px par cellule
Hover: background --surface-alt
```

### Données (4)
```
4.9     | Note Google       | +200 avis 5 étoiles vérifiés
24/7    | Disponibilité     | Réservation à toute heure, 365j/an
15min   | Temps de réponse  | Confirmation de réservation garantie
0€      | Frais cachés      | Tarif fixe annoncé = tarif payé
```

---

## 4. SERVICES — Expanding Strips

### Layout
```
Fond: --cream
Header: tag "NOS SERVICES" + H2 "Un service pour chaque occasion"
Composant: 5 strips verticaux côte à côte, hauteur 480px (360px mobile)
Gap: 3px entre strips
Overflow: hidden, pas de border-radius
```

### Photos par strip
```
Strip 01 Aéroport:     /images/classe-s-parking.jpg
Strip 02 Affaires:     /images/classe-s-interieur.jpg
Strip 03 Événements:   /images/flotte-chateau.jpeg
Strip 04 Longue Dist:  /images/classe-s-bastide.jpg
Strip 05 Touristique:  /images/lavande-provence.jpg
```

### Comportement
```
État fermé (flex: 1):
  - Photo background (images ci-dessus)
  - Overlay sombre gradient vers le bas
  - Texte vertical (writing-mode: vertical-rl) : "Aéroport", "Affaires", etc.
  - Numéro : "01", "02", etc. en petit au-dessus

État ouvert (flex: 5):
  - Photo background zoomée (scale 1.05)
  - Barre accent lavande 2px à gauche, de 0 à 100% hauteur
  - Contenu visible:
    - Numéro "01 / 05"
    - Titre Instrument Serif 32px blanc
    - Description Sora 13px rgba blanc 0.65, max-width 360px
    - Tags: "Suivi de vol", "Tarif fixe" — bordure rgba blanc 0.15, backdrop-blur
    - CTA: ligne lavande 32px + texte "Réserver" uppercase
```

### Services (5 strips)
```
01 | Transfert Aéroport | Prise en charge dès l'atterrissage. Suivi de vol, panneau nominatif. | Suivi de vol, Tarif fixe, Panneau nominatif
02 | Déplacement Affaires | Discrétion et ponctualité. Mise à disposition demi-journée ou journée. | Wi-Fi, Discrétion, Mise à disposition
03 | Événements & Soirées | Mariages, galas, concerts. Aller-retour, chauffeur dédié. | Aller-retour, Attente incluse
04 | Longue Distance | Nice, Lyon, Monaco. Véhicule privé, pas de correspondances. | France entière, Tarif négocié
05 | Visite Touristique | Gordes, Roussillon, Cassis. Itinéraires sur mesure. | Sur mesure, Demi-journée
```

### Mobile
```
Hauteur: 360px
3 strips visibles (2 fermés + 1 ouvert), swipe horizontal pour les autres
Ou : stack vertical avec accordéon classique
```

---

## 5. FLOTTE — Tableau éditorial

### Layout
```
Fond: --surface (blanc)
Header: tag "NOTRE FLOTTE" + H2 "Mercedes haut de gamme"
Structure: grille 3 colonnes avec bordures (même style que Atouts)
Border extérieur: 1px solid --border
Séparateurs: border-right entre colonnes
Mobile: stack vertical
```

### Photos par véhicule
```
Classe E: /images/classe-e-provence.jpg  (profil route + Sainte-Victoire)
Classe S: /images/classe-s-provence.jpg  (profil route + Sainte-Victoire) — modèle phare
Classe V: /images/classe-v-provence.jpg  (profil route + Sainte-Victoire)
```

### Contenu par colonne
```
1. Photo: zone 200px hauteur, photo réelle Mercedes (voir ci-dessus)
2. Nom: Instrument Serif 24px, --texte
3. Classe: Sora 10px uppercase tracking 0.15em, --lavande
4. Specs: liste clé-valeur avec séparateurs fines (border-bottom 1px --border)
   - Passagers: X
   - Bagages: X
   - Feature clé: X

Modèle phare (Classe S): border-top 2px --lavande pour le distinguer
```

### Données (3)
```
Mercedes Classe E | Berline confort  | 3 pax, 3 bags, Wi-Fi
Mercedes Classe S | Premium (phare)  | 3 pax, 3 bags, Sièges massants
Mercedes Classe V | Van premium      | 7 pax, 7 bags, Idéal groupes
```

---

## 6. ZONES — Carte + liste

### Layout
```
Fond: --cream
Header: tag "ZONES DESSERVIES" + H2
Structure: grid 2 colonnes (1.2fr carte | 0.8fr liste)
Border: 1px solid --border sur l'ensemble
Mobile: stack (carte au-dessus, liste en dessous)
```

### Colonne gauche — Carte
```
Carte stylisée de la Provence (SVG interactif ou image)
Points animés GSAP sur chaque destination
Fond alternatif: /images/vignes-provence.jpg (vue vignobles Provence)
Ou: SVG SaintVictoire.jsx déjà créé (adapter couleur)
```

### Colonne droite — Liste
```
Items empilés, border-bottom entre chaque:
  - Destination: Instrument Serif 18px
  - Meta: distance + prix
  - Accent: barre verticale lavande 2px à gauche au hover/active
Padding: 28px 32px par item
```

### Données principales
```
Aéroport Marseille    | 35 min — 42 km  | dès 65€
Gare TGV Aix          | 15 min — 12 km  | dès 25€
Aéroport Nice          | 2h — 180 km     | dès 220€
Cassis / Calanques     | 45 min — 50 km  | dès 75€
Gordes / Luberon       | 1h — 65 km      | dès 90€
```

---

## 7. AVIS — Grande citation + Marquee

### Layout
```
Fond: --cream
Header: tag "AVIS CLIENTS" + H2
Structure: 2 blocs verticaux
  1. Avis principal : grande citation + auteur
  2. Marquee : défilement horizontal infini
```

### Avis principal
```
Bordures: border-top + border-bottom 1px --border
Padding: 64px 0
Guillemet décoratif: " en Instrument Serif 120px, --lavande opacity 0.12, position absolute
Texte: Instrument Serif italic 36px (24px mobile), --texte, line-height 1.35, max-width 800px
Auteur:
  - Avatar: cercle 44px, initiales, gradient lavande→olive
  - Nom: Sora 13px 600
  - Détail: Sora 11px --texte-light
  - Étoiles: ★ × 5, --lavande, alignées à droite
```

### Marquee
```
Border-top: 1px --border
Padding: 20px 0
Animation: translateX infini 30s linear
Contenu (dupliqué 2x):
  Chaque item = étoiles + citation courte italic + nom
  Séparateur: cercle 4px --border entre chaque
Pause: hover → animation-play-state: paused
```

---

## 8. FAQ — Accordéon

### Layout
```
Fond: --surface (blanc)
Header: tag "QUESTIONS FRÉQUENTES" + H2
Structure: liste d'items empilés, border-bottom entre chaque
Max-width: 800px, centré
```

### Item FAQ
```
Question: Sora 15px 600, --texte | padding 24px 0
Icône: ChevronRight Lucide, rotation 90° quand ouvert
Réponse: Sora 14px 300, --texte-light, line-height 1.7
Animation: GSAP height auto (voir ANIMATIONS.md)
border-bottom: 1px --border
```

---

## 9. CONTACT — Split dark/light

### Layout
```
Structure: grid 2 colonnes (0.5fr info | 1fr form)
Border: 1px solid --border
Mobile: stack (info au-dessus)
```

### Colonne gauche — Infos (fond sombre)
```
Background: --texte (#2A2A2A)
Padding: 48px
Couleur texte: blanc / rgba blanc

Contenu:
  - Titre: Instrument Serif 28px blanc
  - Blocs info (Téléphone, Email, Zone):
    - Label: Sora 9px uppercase tracking 0.2em, rgba blanc 0.35
    - Valeur: Sora 14px, rgba blanc 0.8
  - Pied: "Licence VTC — SIRET..." Sora 10px rgba blanc 0.25
```

### Colonne droite — Formulaire
```
Background: --surface (blanc)
Padding: 48px

Champs:
  - Nom + Téléphone (2 colonnes)
  - Service (1 colonne)
  - Date & heure (1 colonne)
  - Message (textarea)
  - CTA: btn-primary "Envoyer la demande →"

Style inputs: underline seulement (voir DESIGN-SYSTEM.md)
```

---

## 10. FOOTER

### Layout
```
Fond: --texte (#2A2A2A)
Padding: 48px 0
Structure: 3 colonnes (logo+desc | liens | contact)
Mobile: stack
```

### Contenu
```
Col 1: Logo "Provençal Coast" Instrument Serif 20px blanc + description courte
Col 2: Liens rapides (Services, Flotte, Zones, Contact, Mentions légales)
Col 3: Infos contact (tél, email, adresse, licence)
Bottom: copyright + "Made with ♥ in Provence"
Couleur texte: rgba blanc 0.6, liens hover → blanc
```

---

## 11. ICÔNE TÉLÉPHONE FLOTTANTE

```
Position: fixed, bottom 24px, right 24px, z-index 999
Specs: voir DESIGN-SYSTEM.md → Icône téléphone flottante
Visible: toujours, sur toutes les sections
Lien: tel:+33615963275
Entrée: après 2s, scale 0→1 avec back.out(2)
```

---

## INVENTAIRE IMAGES — public/images/

| Fichier | Contenu | Section |
|---------|---------|---------|
| `classe-e-provence.jpg` | Classe E profil, route + Sainte-Victoire | Flotte |
| `classe-s-provence.jpg` | Classe S profil, route + Sainte-Victoire | Flotte (phare) |
| `classe-v-provence.jpg` | Classe V profil, route + Sainte-Victoire | Flotte |
| `classe-s-interieur.jpg` | S-Class intérieur cuir, lumière ambiante | Services — Affaires |
| `classe-s-parking.jpg` | S-Class extérieur garé Provence | Services — Aéroport |
| `classe-s-bastide.jpg` | S-Class devant bastide lierre | Services — Longue Distance |
| `classe-v-bastide.jpg` | V-Class devant bastide + cyprès | Services — Visite Touristique |
| `classe-v-interieur.jpg` | V-Class intérieur cuir noir | Services alt |
| `mercedes-motion.jpeg` | S-Class motion blur (stock) | Hero fallback |
| `flotte-chateau.jpeg` | Flotte alignée au château | Services — Événements |
| `flotte-hotel-luxe.jpg` | 2 S-Class devant hôtel luxe | Atouts / confiance |
| `flotte-intercontinental.jpeg` | Flotte V+E+S devant hôtel | Footer / confiance |
| `lavande-provence.jpg` | Champ de lavande Provence | Services — Touristique |
| `vignes-provence.jpg` | Vignobles depuis véhicule | Zones / ambiance |

Note: Toutes les images sont dans `public/images/`. En production, chemin = `/images/nom.jpg`.
Les PNG icônes du dossier source ne sont PAS utilisées — on utilise Lucide React.
