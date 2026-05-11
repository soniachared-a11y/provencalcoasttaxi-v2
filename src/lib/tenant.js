// Identifiant tenant utilisé par le dashboard taximalacrida.fr pour filtrer
// les réservations par activité (provencal / malacrida / autres).
//
// ⚠️ NE JAMAIS modifier cette valeur sans coordonner avec le code du
// dashboard. Une typo (ex. 'provencale' avec un 'e' final) casse le routage
// WhatsApp et fait perdre les réservations côté chauffeur. Bug réel survenu
// le 2 mai 2026, corrigé le 11 mai. Référence : commit 0889833.
//
// Pour étendre à un autre site, importer cette constante uniquement —
// n'écrivez jamais le string en dur dans un formulaire.

export const TENANT_MARQUE = 'provencal'
