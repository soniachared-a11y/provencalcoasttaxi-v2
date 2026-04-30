// Tarification taxi — source de vérité unique
// Tarif au km : identique pour tous les véhicules (jour/nuit)
// La différence entre véhicules se fait sur la prise en charge
// Calé sur l'exemple client : Aix centre → TGV (~13 km, jour)
// → Éco 35€ / Berline 40€ / Van 50€

export const TARIF_JOUR = 2.22 // €/km — 6h à 19h
export const TARIF_NUIT = 2.88 // €/km — 19h à 6h

export const TIERS = {
  eco: {
    id: 'eco',
    label: 'Éco',
    vehicule: 'Tesla',
    description: 'Tesla — silencieuse, écologique',
    prise: 6,
    pax: 3,
    bagages: 2,
  },
  berline: {
    id: 'berline',
    label: 'Berline',
    vehicule: 'Mercedes Classe E',
    description: 'Mercedes Classe E — confort premium',
    prise: 11,
    pax: 3,
    bagages: 3,
  },
  van: {
    id: 'van',
    label: 'Van',
    vehicule: 'Mercedes Classe V',
    description: 'Mercedes Classe V — jusqu\'à 7 passagers',
    prise: 21,
    pax: 7,
    bagages: 7,
  },
}

export const TIER_LIST = [TIERS.eco, TIERS.berline, TIERS.van]

// Nuit = 19h → 6h
export function isNightHour(h) {
  return h >= 19 || h < 6
}

// Prix arrondi à l'euro
export function priceFor(tierId, km, hour = 12) {
  const tier = TIERS[tierId]
  if (!tier || !km) return null
  const tarif = isNightHour(hour) ? TARIF_NUIT : TARIF_JOUR
  return Math.round(tier.prise + km * tarif)
}

// Renvoie les 3 prix pour une distance donnée
export function pricesAll(km, hour = 12) {
  if (!km) return null
  return {
    eco: priceFor('eco', km, hour),
    berline: priceFor('berline', km, hour),
    van: priceFor('van', km, hour),
    isNuit: isNightHour(hour),
    km,
  }
}
