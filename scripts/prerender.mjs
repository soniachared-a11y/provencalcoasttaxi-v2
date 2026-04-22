// Pré-rendu statique des routes — un HTML par page avec meta SEO unique
// Corrige le problème GSC : canonical/title/description par route, visibles par Googlebot au 1er passage
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const DOMAIN = 'https://www.taxisprovencaleaix.fr'

// ── Métadonnées uniques par route (miroir de SEOHead) ────────────────────────
const ROUTES = [
  {
    path: '/',
    file: 'index.html',
    title: 'Taxi Aix-en-Provence | VTC & Chauffeur privé 24h/24 — Taxis Provençale Aix',
    description: 'Taxi et chauffeur privé VTC à Aix-en-Provence. Mercedes Classe S, E et V. Transfert aéroport Marseille-Provence Marignane, gare TGV Aix, tourisme Luberon, Gordes, Cassis. Tarif fixe garanti, disponible 24h/24 7j/7. ☎ 06 15 96 32 75.',
  },
  {
    path: '/services',
    file: 'services/index.html',
    title: 'Transfert aéroport Marseille, taxi gare TGV Aix, VTC Provence — Taxis Provençale Aix',
    description: 'Transfert aéroport Marseille-Provence Marignane, navette gare TGV Aix, taxi Luberon Gordes, déplacements affaires, mariage et événements, longue distance Nice Monaco Cannes. Mercedes avec chauffeur, tarif fixe. ☎ 06 15 96 32 75.',
  },
  {
    path: '/flotte',
    file: 'flotte/index.html',
    title: 'Mercedes avec chauffeur Aix-en-Provence | Classe S, E, V 7 places — Taxis Provençale Aix',
    description: 'Flotte Mercedes haut de gamme à Aix-en-Provence : Classe E business, Classe S prestige sièges massants, Classe V van 7 places. Wi-Fi, climatisation, cuir. Transfert aéroport Marseille, gare TGV, Luberon. Tarif fixe. ☎ 06 15 96 32 75.',
  },
  {
    path: '/a-propos',
    file: 'a-propos/index.html',
    title: 'À propos — Taxis Provençale Aix | Chauffeur privé depuis 10 ans à Aix-en-Provence',
    description: 'Découvrez Taxis Provençale Aix : plus de 10 ans d\'expérience en transport privé haut de gamme en Provence. Chauffeurs bilingues, flotte Mercedes entretenue quotidiennement, service 24h/24.',
  },
  {
    path: '/contact',
    file: 'contact/index.html',
    title: 'Réserver taxi Aix-en-Provence | Devis gratuit & tarif fixe — Taxis Provençale Aix',
    description: 'Réservez votre taxi ou VTC à Aix-en-Provence en ligne. Confirmation en 15 min, tarif fixe garanti, annulation gratuite 24h. Transferts aéroport Marseille Marignane, gare TGV, Luberon, événements. ☎ 06 15 96 32 75 — disponible 24h/24.',
  },
  {
    path: '/mentions-legales',
    file: 'mentions-legales/index.html',
    title: 'Mentions légales — Taxis Provençale Aix',
    description: 'Mentions légales, politique de confidentialité et conditions d\'utilisation du site taxisprovencaleaix.fr. Taxis Provençale Aix, 82 avenue Henri Mauriat, 13100 Aix-en-Provence.',
  },
  // ── Pages longue-traîne SEO ────────────────────────────────────────────────
  {
    path: '/taxi-aeroport-marseille-aix-en-provence',
    file: 'taxi-aeroport-marseille-aix-en-provence/index.html',
    title: 'Taxi aéroport Marseille ↔ Aix-en-Provence | 65 € fixe 24h/24 — Taxis Provençale Aix',
    description: 'Taxi et VTC Aix-en-Provence → aéroport Marseille-Provence (Marignane) à 65 € fixe, 42 km en 35 min. Suivi de vol, panneau nominatif, disponible 24h/24. Réservez au 06 15 96 32 75.',
  },
  {
    path: '/taxi-gare-tgv-aix-en-provence',
    file: 'taxi-gare-tgv-aix-en-provence/index.html',
    title: 'Taxi gare TGV Aix-en-Provence | 25 € fixe 24h/24 — Taxis Provençale Aix',
    description: 'Taxi et VTC entre Aix-en-Provence centre et la gare TGV d\'Aix à 25 € fixe. 12 km en 15 min. Disponible 24h/24, panneau nominatif à l\'arrivée du train. Réservation au 06 15 96 32 75.',
  },
  {
    path: '/vtc-luberon-gordes-cassis',
    file: 'vtc-luberon-gordes-cassis/index.html',
    title: 'VTC Luberon, Gordes, Cassis | Chauffeur privé Provence — Taxis Provençale Aix',
    description: 'VTC privé au départ d\'Aix-en-Provence pour le Luberon (Gordes, Roussillon, Ménerbes), Cassis et les Calanques. Mercedes avec chauffeur bilingue, journée sur mesure dès 450 €.',
  },
  {
    path: '/chauffeur-prive-mariage-aix',
    file: 'chauffeur-prive-mariage-aix/index.html',
    title: 'Chauffeur privé mariage Aix-en-Provence | Mercedes cérémonie — Taxis Provençale Aix',
    description: 'Chauffeur privé pour mariage à Aix-en-Provence et alentours. Mercedes Classe S avec rubans, navettes invités, transferts aéroport et hôtel. Devis personnalisé, équipes dédiées.',
  },
]

const IMAGE = `${DOMAIN}/images/classe-s-provence.jpg`

// ── Remplacement précis de chaque balise SEO du shell index.html ─────────────
function replaceMeta(html, { title, description, path }) {
  const url = `${DOMAIN}${path}`

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escape(description)}" />`
  )

  // <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${url}" />`
  )

  // Open Graph
  html = html.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${escape(title)}" />`
  )
  html = html.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escape(description)}" />`
  )
  html = html.replace(
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${url}" />`
  )
  html = html.replace(
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${IMAGE}" />`
  )

  // Twitter
  html = html.replace(
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${escape(title)}" />`
  )
  html = html.replace(
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${escape(description)}" />`
  )
  html = html.replace(
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${IMAGE}" />`
  )

  return html
}

function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── Exécution ────────────────────────────────────────────────────────────────
if (!existsSync(DIST)) {
  console.error('[prerender] dist/ inexistant — lancez vite build en premier')
  process.exit(1)
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')
// Les HTML SSR pré-générés (via scripts/ssr-prerender.mjs) sont commités dans
// public/_ssr/. Si disponibles, on les utilise (HTML complet avec image hero
// visible → LCP mobile instantané).
const SSR_SOURCE = join(ROOT, 'public', '_ssr')

let ssrCount = 0
let shellCount = 0

for (const route of ROUTES) {
  const ssrPath = join(SSR_SOURCE, route.file)
  let out
  if (existsSync(ssrPath)) {
    // HTML SSR pré-généré disponible → on l'utilise (LCP mobile optimal)
    out = readFileSync(ssrPath, 'utf8')
    ssrCount++
  } else {
    // Fallback : shell vide + meta tags replacés
    out = replaceMeta(shell, route)
    shellCount++
  }
  const outPath = join(DIST, route.file)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, out, 'utf8')
  console.log(`[prerender] ✓ ${existsSync(ssrPath) ? 'SSR' : 'shell'}  ${route.file}  →  ${route.title.slice(0, 55)}…`)
}

console.log(`[prerender] ${ROUTES.length} pages (${ssrCount} SSR + ${shellCount} shell) dans dist/`)
