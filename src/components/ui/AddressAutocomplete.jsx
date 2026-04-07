import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin } from '@phosphor-icons/react'
import { searchAddress, getRouteKm } from '../../lib/geo'

// Popular origins — departure points (lat/lng only, no km)
const QUICK_ORIGINS = [
  { label: 'Aix-en-Provence Centre', lat: 43.5297, lng: 5.4474 },
  { label: 'Gare TGV Aix-en-Provence', lat: 43.4539, lng: 5.3234 },
  { label: 'Aéroport Marseille-Provence (MRS)', lat: 43.4358, lng: 5.2214 },
  { label: 'Marseille Centre', lat: 43.2965, lng: 5.3698 },
  { label: 'Avignon Centre', lat: 43.9493, lng: 4.8055 },
  { label: 'Nice Centre', lat: 43.7102, lng: 7.2620 },
  { label: 'Monaco', lat: 43.7384, lng: 7.4246 },
  { label: 'Cannes Centre', lat: 43.5528, lng: 7.0174 },
]

// Popular predefined destinations (instant km, no routing needed)
const QUICK_DESTINATIONS = [
  { label: 'Aéroport Marseille-Provence (MRS)', km: 26, lat: 43.4358, lng: 5.2214 },
  { label: 'Gare TGV Aix-en-Provence', km: 16, lat: 43.4539, lng: 5.3234 },
  { label: 'Marseille Centre', km: 32, lat: 43.2965, lng: 5.3698 },
  { label: "Aéroport Nice Côte d'Azur (NCE)", km: 175, lat: 43.6654, lng: 7.2153 },
  { label: 'Cassis / Calanques', km: 52, lat: 43.2135, lng: 5.5383 },
  { label: 'Gordes / Luberon', km: 75, lat: 43.9109, lng: 5.1981 },
  { label: 'Avignon Centre', km: 82, lat: 43.9493, lng: 4.8055 },
  { label: 'Monaco', km: 200, lat: 43.7384, lng: 7.4246 },
  { label: 'Cannes', km: 150, lat: 43.5528, lng: 7.0174 },
  { label: 'Arles', km: 75, lat: 43.6762, lng: 4.6272 },
  { label: 'Saint-Rémy-de-Provence', km: 74, lat: 43.7891, lng: 4.8316 },
  { label: 'Les Baux-de-Provence', km: 72, lat: 43.7442, lng: 4.7974 },
  { label: 'Salon-de-Provence', km: 35, lat: 43.6405, lng: 5.0972 },
  { label: 'Pertuis', km: 22, lat: 43.6919, lng: 5.5031 },
  { label: 'Manosque', km: 58, lat: 43.8348, lng: 5.7872 },
]

/**
 * AddressAutocomplete
 * Unified component for dark and light contexts.
 *
 * Props:
 *   value       { label, km, lat?, lng? } | null
 *   onChange    (result) => void   — result = { label, km }
 *   placeholder string
 *   dark        boolean  — dark background theme
 *   inputStyle  object   — extra styles for the input element
 *   onLoadingChange (bool) => void  — optional loading state callback
 */
export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Ville, aéroport, adresse…',
  dark = false,
  inputStyle = {},
  onLoadingChange,
  isOrigin = false,
  'aria-label': ariaLabel = 'Adresse',
  id,
}) {
  const [query, setQuery] = useState(value?.label || '')
  const [photonResults, setPhotonResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [routeLoading, setRouteLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const abortRef = useRef(null)
  const debounceRef = useRef(null)

  // Sync from external value
  useEffect(() => {
    setQuery(value?.label || '')
  }, [value?.label])

  // Close dropdown on outside click
  useEffect(() => {
    const h = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Filter quick destinations/origins by query
  const quickPool = isOrigin ? QUICK_ORIGINS : QUICK_DESTINATIONS
  const quickMatches = query.length > 0
    ? quickPool.filter(d => d.label.toLowerCase().includes(query.toLowerCase()))
    : quickPool.slice(0, isOrigin ? QUICK_ORIGINS.length : 8)

  // Debounced Photon search
  const handleQueryChange = useCallback((q) => {
    setQuery(q)
    setOpen(true)
    if (!q.trim()) {
      onChange(null)
      setPhotonResults([])
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new AbortController()
      setLoading(true)
      const results = await searchAddress(q, abortRef.current.signal)
      setLoading(false)
      // Filter out results already in quick destinations
      const filtered = results.filter(r =>
        !QUICK_DESTINATIONS.some(qd => qd.label.toLowerCase() === r.label.toLowerCase())
      )
      setPhotonResults(filtered)
    }, 320)
  }, [onChange])

  // Select a quick destination/origin
  const selectQuick = useCallback((d) => {
    setQuery(d.label)
    setOpen(false)
    setPhotonResults([])
    onChange(isOrigin
      ? { label: d.label, lat: d.lat, lng: d.lng }
      : { label: d.label, km: d.km, lat: d.lat, lng: d.lng })
  }, [onChange, isOrigin])

  // Select a Photon result → fetch OSRM distance
  const selectPhoton = useCallback(async (item) => {
    setQuery(item.label)
    setOpen(false)
    setPhotonResults([])
    setRouteLoading(true)
    onLoadingChange?.(true)
    const km = await getRouteKm(item.lat, item.lng)
    setRouteLoading(false)
    onLoadingChange?.(false)
    onChange({ label: item.label, km: km ?? null, lat: item.lat, lng: item.lng })
  }, [onChange, onLoadingChange])

  const isLoading = loading || routeLoading
  const hasResults = quickMatches.length > 0 || photonResults.length > 0

  // Theme tokens
  const bg = dark ? '#111318' : '#fff'
  const itemHoverBg = dark ? 'rgba(255,255,255,0.05)' : '#F6F3EE'
  const borderColor = dark ? 'rgba(255,255,255,0.1)' : 'var(--border)'
  const textColor = dark ? '#fff' : 'var(--texte)'
  const mutedColor = dark ? 'rgba(255,255,255,0.35)' : 'var(--texte-light)'
  const labelColor = dark ? 'rgba(255,255,255,0.28)' : 'var(--texte-faint)'

  const baseInput = {
    width: '100%',
    height: 44,
    paddingLeft: 36,
    paddingRight: isLoading ? 36 : 12,
    background: 'transparent',
    border: `1px solid ${borderColor}`,
    color: textColor,
    fontFamily: 'Sora, sans-serif',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.25s ease',
    borderRadius: 2,
    ...inputStyle,
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      {/* Pin icon */}
      <MapPin
        size={14}
        weight="duotone"
        style={{
          position: 'absolute', left: 12, top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--lavande)', pointerEvents: 'none', zIndex: 1,
        }}
      />

      {/* Input */}
      <input
        type="text"
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholder}
        value={query}
        onChange={e => handleQueryChange(e.target.value)}
        onFocus={e => {
          setOpen(true)
          e.target.style.borderColor = 'var(--lavande)'
        }}
        onBlur={e => {
          e.target.style.borderColor = borderColor
        }}
        style={baseInput}
        aria-label={ariaLabel}
        {...(id ? { id } : {})}
      />

      {/* Spinner */}
      {isLoading && (
        <div style={{
          position: 'absolute', right: 12, top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            border: '2px solid var(--lavande)',
            borderTopColor: 'transparent',
            animation: 'addr-spin 0.65s linear infinite',
          }} />
        </div>
      )}

      {/* Dropdown */}
      {open && hasResults && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0, right: 0, zIndex: 500,
          background: bg,
          border: `1px solid ${borderColor}`,
          boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
          maxHeight: 280,
          overflowY: 'auto',
        }}>
          {/* Quick destinations section */}
          {quickMatches.length > 0 && (
            <>
              <div style={{
                padding: '7px 14px 5px',
                fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: labelColor,
                borderBottom: `1px solid ${borderColor}`,
              }}>
                {isOrigin ? 'Points de départ populaires' : 'Destinations populaires'}
              </div>
              {quickMatches.map((d, i) => (
                <button
                  key={`q-${i}`}
                  type="button"
                  onMouseDown={() => selectQuick(d)}
                  style={{
                    width: '100%', padding: '10px 14px 10px 36px',
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    background: 'transparent', border: 'none',
                    borderBottom: `1px solid ${borderColor}`,
                    fontFamily: 'Sora', fontSize: 12.5,
                    color: textColor, textAlign: 'left', gap: 8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = itemHoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {d.label}
                  </span>
                  {!isOrigin && d.km && (
                    <span style={{ fontSize: 10, color: 'var(--olive)', fontWeight: 700, flexShrink: 0 }}>
                      {d.km} km
                    </span>
                  )}
                </button>
              ))}
            </>
          )}

          {/* Photon (OSM) results section */}
          {photonResults.length > 0 && (
            <>
              <div style={{
                padding: '7px 14px 5px',
                fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: labelColor,
                borderBottom: `1px solid ${borderColor}`,
              }}>
                Autres adresses
              </div>
              {photonResults.map((r, i) => (
                <button
                  key={`p-${i}`}
                  type="button"
                  onMouseDown={() => selectPhoton(r)}
                  style={{
                    width: '100%', padding: '10px 14px 10px 36px',
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    background: 'transparent', border: 'none',
                    borderBottom: i < photonResults.length - 1 ? `1px solid ${borderColor}` : 'none',
                    fontFamily: 'Sora', fontSize: 12.5,
                    color: textColor, textAlign: 'left', gap: 8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = itemHoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.label}
                  </span>
                  <span style={{ fontSize: 9, color: mutedColor, flexShrink: 0, fontStyle: 'italic' }}>
                    calcul en cours…
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes addr-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
