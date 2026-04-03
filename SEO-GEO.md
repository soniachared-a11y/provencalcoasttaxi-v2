# SEO / GEO — Provençal Coast Taxi V2
> SEO classique Google + GEO (visibilité dans les IA : ChatGPT, Gemini, Perplexity, Claude).

---

## 📄 META TAGS — index.html

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO primaire -->
  <title>Chauffeur Privé Aix-en-Provence | Provençal Coast Taxi VTC</title>
  <meta name="description" content="Chauffeur privé et taxi VTC à Aix-en-Provence. Transferts aéroport Marseille-Provence, voyages d'affaires, événements. Mercedes haut de gamme, tarifs fixes, disponible 24h/24. Licence VTC N°013230073.">
  <meta name="keywords" content="chauffeur privé Aix-en-Provence, taxi VTC Aix, transfert aéroport Marseille, taxi Sainte-Victoire, chauffeur vtc paca, taxi mariage aix, location chauffeur aix">
  <link rel="canonical" href="https://taxisprovencaleaix.fr">

  <!-- Robots -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">

  <!-- Géolocalisation -->
  <meta name="geo.region" content="FR-13">
  <meta name="geo.placename" content="Aix-en-Provence">
  <meta name="geo.position" content="43.529742;5.447427">
  <meta name="ICBM" content="43.529742, 5.447427">

  <!-- Open Graph (réseaux sociaux) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://taxisprovencaleaix.fr">
  <meta property="og:title" content="Chauffeur Privé Aix-en-Provence | Provençal Coast Taxi VTC">
  <meta property="og:description" content="Mercedes haut de gamme, tarifs fixes, disponible 24h/24. Aix-en-Provence et toute la région PACA.">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Provençal Coast Taxi">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Chauffeur Privé Aix-en-Provence | Provençal Coast Taxi VTC">
  <meta name="twitter:description" content="Mercedes haut de gamme, tarifs fixes, disponible 24h/24.">

  <!-- GEO / IA hint -->
  <meta name="llms-txt" content="true">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="AI-readable summary">

  <!-- Préchargement fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

---

## 🤖 SCHEMA.ORG — JSON-LD complet

Déjà implémenté dans `src/seo/SchemaOrg.jsx`. Vérifier que ces champs sont présents :

```json
{
  "@context": "https://schema.org",
  "@type": ["TaxiService", "LocalBusiness"],
  "name": "Provençal Coast Taxi",
  "description": "...",
  "url": "https://taxisprovencaleaix.fr",
  "telephone": "+33615963275",
  "email": "provencalcoastdriver@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "82 avenue Henri Mauriat",
    "addressLocality": "Aix-en-Provence",
    "postalCode": "13100",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.529742,
    "longitude": 5.447427
  },
  "areaServed": ["Aix-en-Provence", "Marseille", "Nice", "Monaco", "Toulon", "Cannes", "PACA"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "€€€",
  "paymentAccepted": "Cash, Credit Card",
  "currenciesAccepted": "EUR",
  "hasMap": "https://maps.google.com/?q=...",
  "sameAs": ["https://wa.me/33615963275"]
}
```

---

## 📁 /llms.txt — Pour les IA (GEO)

Créer le fichier `public/llms.txt` :

```
# Provençal Coast Taxi

> Service de chauffeur privé et taxi VTC basé à Aix-en-Provence, France.

## Services
- Transferts aéroport Marseille-Provence (MRS)
- Voyages d'affaires et transferts corporate
- Location de chauffeur à l'heure ou à la journée
- Événements privés (mariages, galas)
- Transferts de groupe (Mercedes V-Class, 8 passagers)
- Service VIP

## Informations de contact
- Téléphone : 06 15 96 32 75
- Email : provencalcoastdriver@gmail.com
- Adresse : 82 avenue Henri Mauriat, 13100 Aix-en-Provence
- Licence VTC : N°013230073
- Disponible : 24h/24, 7j/7

## Zone d'intervention
Aix-en-Provence, Marseille, Nice, Monaco, Toulon, Cannes, et toute la région PACA.

## Flotte
- Mercedes S-Class (3 passagers, luxe prestige)
- Mercedes E-Class (3 passagers, business)
- Mercedes V-Class (8 passagers, groupe)

## Caractéristiques
- Tarifs fixes — aucun compteur
- Bilingue français/anglais
- Suivi des vols en temps réel
- Assurance tous passagers
```

---

## 🏠 STRUCTURE SÉMANTIQUE HTML

Claude Code doit utiliser les balises sémantiques correctes :

```html
<header> → Nav uniquement
<main>   → Toutes les sections du site
<section id="accueil" aria-label="Accueil"> → Hero
<section id="services" aria-label="Nos services">
<section id="flotte" aria-label="Notre flotte">
<section id="zones" aria-label="Zones desservies">
<section id="contact" aria-label="Réservation">
<footer> → Footer uniquement
```

### Hiérarchie des titres (une seule H1)
```
H1 → Hero : "Chauffeur Privé Aix-en-Provence" (un seul sur la page)
H2 → Titre de chaque section principale
H3 → Titres de cartes (services, flotte, FAQ)
```

---

## 🔑 MOTS-CLÉS STRATÉGIQUES

### Intention transactionnelle (convertit)
- "chauffeur privé Aix-en-Provence"
- "taxi VTC Aix-en-Provence"
- "transfert aéroport Marseille"
- "réserver chauffeur Aix"
- "taxi Sainte-Victoire"

### Intention informationnelle (visibilité)
- "prix taxi Aix aéroport Marseille"
- "chauffeur privé gare TGV Aix"
- "VTC mariage Aix-en-Provence"
- "location chauffeur journée PACA"

### Longue traîne (GEO / IA)
- "chauffeur privé disponible nuit Aix-en-Provence"
- "Mercedes avec chauffeur Aix Monaco"
- "taxi groupe 8 personnes Aix-en-Provence"
- "VTC licence officielle Aix-en-Provence"

---

## ⚡ PERFORMANCE (Lighthouse > 90)

### Images
- Format WebP obligatoire si des images sont ajoutées
- Attribut `width` et `height` explicites sur toutes les images
- `loading="lazy"` sur toutes sauf hero
- `fetchpriority="high"` sur l'image hero si présente

### Fonts
- `display=swap` sur Google Fonts (déjà dans l'import)
- Précharger Playfair Display 700 : `<link rel="preload" as="font">`

### Code
- Pas de CSS bloquant
- Vite bundle splitting automatique — ne pas toucher
- `defer` sur les scripts non critiques

### Core Web Vitals cibles
- LCP (Largest Contentful Paint) : < 2.5s
- FID / INP : < 100ms
- CLS : < 0.1

---

## 🗺 SITEMAP

Créer `public/sitemap.xml` avec ces 11 URLs :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://taxisprovencaleaix.fr/</loc><priority>1.0</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/taxi-aix-en-provence</loc><priority>0.9</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/taxi-marseille</loc><priority>0.9</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/taxi-nice</loc><priority>0.8</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/taxi-monaco</loc><priority>0.8</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/taxi-toulon</loc><priority>0.8</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/taxi-cannes</loc><priority>0.8</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/transfert-aeroport-marseille</loc><priority>0.9</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/transfert-gare-tgv-aix</loc><priority>0.8</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/chauffeur-vip</loc><priority>0.7</priority></url>
  <url><loc>https://taxisprovencaleaix.fr/transfert-longue-distance</loc><priority>0.7</priority></url>
</urlset>
```

---

## ✅ CHECKLIST SEO AVANT DÉPLOIEMENT

- [ ] Title unique et < 60 caractères
- [ ] Meta description entre 120-155 caractères
- [ ] Une seule H1 sur la page
- [ ] Hiérarchie H1 > H2 > H3 respectée
- [ ] Tous les liens internes fonctionnels
- [ ] Schema.org valide (tester sur schema.org/validator)
- [ ] /llms.txt accessible
- [ ] /sitemap.xml accessible
- [ ] Canonical tag correct
- [ ] Pas de contenu dupliqué
- [ ] Images avec alt text
- [ ] Lighthouse SEO score ≥ 90
