// ── geo.js — Geocoding + routing ──────────────────────────────────────────────
// BAN (Base Adresse Nationale) pour France — codes postaux exacts
// Photon (Komoot/OSM) pour adresses internationales
// OSRM pour calcul des distances réelles

export const AIX = { lat: 43.5297, lng: 5.4474 }

const ALLOWED_COUNTRIES = new Set(['France', 'Belgique', 'Italie', 'Espagne', 'Monaco'])
const BBOX = '-9.5,36.0,18.5,51.5'

/**
 * Recherche d'adresses :
 * - BAN (api-adresse.data.gouv.fr) pour la France → codes postaux corrects
 * - Photon pour Belgique, Italie, Espagne, Monaco
 */
export async function searchAddress(query, signal) {
  if (!query || query.trim().length < 2) return []

  try {
    const banUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=fr&bbox=${BBOX}`

    const [banRes, photonRes] = await Promise.allSettled([
      fetch(banUrl, { signal }),
      fetch(photonUrl, { signal }),
    ])

    const results = []

    // Résultats BAN — France uniquement, très précis
    if (banRes.status === 'fulfilled' && banRes.value.ok) {
      const data = await banRes.value.json()
      data.features
        .filter(f => (f.properties.score ?? 0) > 0.3)
        .forEach(f => {
          const p = f.properties
          if (!p.label) return
          results.push({
            label: p.label,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0],
            country: 'France',
          })
        })
    }

    // Résultats Photon — international seulement (France gérée par BAN)
    if (photonRes.status === 'fulfilled' && photonRes.value.ok) {
      const data = await photonRes.value.json()
      data.features
        .filter(f => f.geometry?.coordinates)
        .filter(f => f.properties.country !== 'France')
        .forEach(f => {
          const p = f.properties
          if (!ALLOWED_COUNTRIES.has(p.country || '')) return
          const parts = []
          if (p.name && p.name !== p.city) parts.push(p.name)
          if (p.street) parts.push(p.street + (p.housenumber ? ' ' + p.housenumber : ''))
          if (p.postcode) parts.push(p.postcode)
          if (p.city) parts.push(p.city)
          if (p.country) parts.push(p.country)
          const label = [...new Set(parts)].join(', ') || p.name || ''
          if (!label) return
          results.push({
            label,
            lat: f.geometry.coordinates[1],
            lng: f.geometry.coordinates[0],
            country: p.country || '',
          })
        })
    }

    return results
  } catch (e) {
    if (e.name === 'AbortError') return []
    console.warn('[geo] search error:', e.message)
    return []
  }
}

/**
 * Distance routière (km) depuis Aix-en-Provence vers une destination
 */
export async function getRouteKm(toLat, toLng) {
  return getRouteKmBetween(AIX.lat, AIX.lng, toLat, toLng)
}

/**
 * Distance routière (km) entre deux points quelconques via OSRM
 */
export async function getRouteKmBetween(fromLat, fromLng, toLat, toLng) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=false`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const data = await res.json()
    if (data.code === 'Ok' && data.routes?.length > 0) {
      return Math.round(data.routes[0].distance / 1000)
    }
    return null
  } catch (e) {
    console.warn('[geo] OSRM error:', e.message)
    return null
  }
}
