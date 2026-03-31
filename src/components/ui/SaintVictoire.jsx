// Silhouette SVG stylisée de la Montagne Sainte-Victoire
// Motif visuel identitaire — utilisé en arrière-plan Hero

export default function SaintVictoire({ className = '', opacity = 0.06 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Silhouette de la Sainte-Victoire — profil ouest-est caractéristique */}
      <path
        d="M0 400 L0 380 L60 370 L120 355 L180 340 L240 330
           L300 315 L340 295 L370 270 L390 245 L400 220
           L410 200 L415 185 L420 175 L428 160 L435 148
           L442 138 L448 130 L455 122 L460 118 L465 115
           L470 112 L475 114 L480 118 L486 124 L492 132
           L498 142 L504 152 L510 162 L516 170 L522 178
           L528 185 L535 193 L542 200 L550 208 L560 218
           L572 228 L586 238 L600 245 L615 250 L630 253
           L648 256 L666 258 L685 260 L705 262 L726 265
           L750 270 L776 278 L800 288 L825 300 L850 312
           L880 325 L915 338 L955 350 L1000 360 L1050 368
           L1110 374 L1180 378 L1260 382 L1350 385 L1440 388
           L1440 400 Z"
        fill={`rgba(201, 168, 76, ${opacity})`}
      />
      {/* Crête principale — légèrement plus visible */}
      <path
        d="M440 148 L448 130 L455 122 L460 118 L465 115
           L470 112 L475 114 L480 118 L486 124 L492 132
           L498 142 L510 162"
        stroke={`rgba(201, 168, 76, ${opacity * 3})`}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
