// CursorFollower.jsx — Curseur custom thème transport
// Flèche olive par défaut, pin GPS lavande uniquement sur les vrais CTAs

export default function CursorFollower() {
  // SVG flèche classique olive (#6B7F4A) — légèrement plus grande
  const arrowSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='28' viewBox='0 0 24 28'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-10%25' width='140%25' height='130%25'%3E%3CfeDropShadow dx='0.5' dy='1' stdDeviation='0.8' flood-color='%23000' flood-opacity='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M2 1L2 22L7.5 17L13 26L16 24.5L10.5 15.5L18 14.5Z' fill='%236B7F4A' stroke='%23F6F3EE' stroke-width='1.2' stroke-linejoin='round' filter='url(%23s)'/%3E%3C/svg%3E") 2 1, default`

  // SVG pin GPS — lavande (#7B6FA6) — uniquement sur les CTAs
  const pinSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='38' viewBox='0 0 28 38'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-10%25' width='140%25' height='130%25'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='1.5' flood-color='%23000' flood-opacity='0.25'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.27 21.73 0 14 0z' fill='%237B6FA6' filter='url(%23s)'/%3E%3Ccircle cx='14' cy='13' r='5.5' fill='%23F6F3EE'/%3E%3C/svg%3E") 14 38, pointer`

  return (
    <style>{`
      @media (pointer: fine) {
        /* Flèche olive partout — classique, branded, pas de I-beam */
        html, html * {
          cursor: ${arrowSVG} !important;
        }
        /* Pin GPS lavande UNIQUEMENT sur les vrais CTAs (data-cta) */
        [data-cta], [data-cta] * {
          cursor: ${pinSVG} !important;
        }
        /* Curseur texte classique dans les champs de saisie */
        input[type="text"], input[type="email"], input[type="tel"],
        input[type="search"], input[type="url"], input[type="number"],
        input[type="date"], input[type="time"], textarea {
          cursor: text !important;
        }
      }
    `}</style>
  )
}
