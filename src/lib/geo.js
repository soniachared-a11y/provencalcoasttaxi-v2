// ── geo.js — Free geocoding + routing, zero API key ──────────────────────────
// Photon (Komoot/OpenStreetMap) for address autocomplete
// OSRM public instance for actual road distance

// Base: Aix-en-Provence city centre
export const AIX = { lat: 43.5297, lng: 5.4474 }

// Pays autorisés (noms en français retournés par Photon avec lang=fr)
const ALLOWED_COUNTRIES = new Set(['France', 'Belgique', 'Italie', 'Espagne', 'Monaco'])

// Bounding box couvrant FR + BE + IT + CH + ES
const BBOX = '-9.5,36.0,18.5,51.5'

/**
 * Search addresses via Photon (OpenStreetMap, no key needed)
 * Restricted to France, Belgium, Italy, Switzerland, Spain
 * Returns [{ label, lat, lng }]
 */
export async function searchAddress(query, signal) {
  if (!query || query.trim().length < 2) return []
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=8&lang=fr&bbox=${BBOX}`
    const res = await fetch(url, { signal })
    if (!res.ok) return []
    const data = await res.json()
    return data.features
      .filter(f => f.geometry?.coordinates)
      .map(f => {
        const p = f.properties
        // Build a clean readable label
        const parts = []
        if (p.name && p.name !== p.city) parts.push(p.name)
        if (p.street) parts.push(p.street + (p.housenumber ? ' ' + p.housenumber : ''))
        if (p.postcode) parts.push(p.postcode)
        if (p.city) parts.push(p.city)
        if (p.country && p.country !== 'France') parts.push(p.country)
        const label = [...new Set(parts)].join(', ') || p.name || ''
        return {
          label,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
          type: p.type || p.osm_value || '',
          country: p.country || '',
        }
      })
      .filter(r => r.label && r.country && ALLOWED_COUNTRIES.has(r.country))
  } catch (e) {
    if (e.name === 'AbortError') return []
    console.warn('[geo] Photon error:', e.message)
    return []
  }
}

/**
 * Get actual driving distance (km) from Aix-en-Provence to destination
 * Uses OSRM public routing server (free, no key)
 */
export async function getRouteKm(toLat, toLng) {
  return getRouteKmBetween(AIX.lat, AIX.lng, toLat, toLng)
}

/**
 * Get actual driving distance (km) between any two points
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
