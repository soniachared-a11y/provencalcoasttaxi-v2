import { Helmet } from 'react-helmet-async'

const DOMAIN = 'https://taxisprovencaleaix.fr'

const DEFAULTS = {
  title: 'Taxis Provençale Aix — Chauffeur privé Aix-en-Provence | VTC Provence',
  description: 'Service de chauffeur privé VTC à Aix-en-Provence. Mercedes Classe S, E et V. Transferts aéroport Marseille-Provence, gare TGV, tourisme Luberon. Tarifs fixes 24h/24.',
  image: `${DOMAIN}/images/classe-s-provence.jpg`,
}

export default function SEOHead({ title, description, path = '/', image }) {
  const t = title || DEFAULTS.title
  const d = description || DEFAULTS.description
  const img = image || DEFAULTS.image
  const url = `${DOMAIN}${path}`

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Taxis Provençale Aix" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  )
}
