import { useEffect, useState } from 'react'

type GeoPosition = {
  latitude: number
  longitude: number
}

type Result = {
  name: string
  distanceMiles: number
  address: string
  city: string
}

export default function AgentWidget() {
  const [position, setPosition] = useState<GeoPosition | null>(null)
  const [status, setStatus] = useState<string>('Ready')
  const [query, setQuery] = useState<string>('barbershop')
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported')
      return
    }
    setStatus('Fetching location...')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
        setStatus('Location acquired')
      },
      () => setStatus('Unable to retrieve location')
    )
  }, [])

  function simulateSearch() {
    setStatus('Searching nearby...')
    // Placeholder static results focused on Bay Area
    const sample: Result[] = [
      { name: 'Mission Fade House', distanceMiles: 1.2, address: '123 Valencia St', city: 'San Francisco' },
      { name: 'SoMa Clippers', distanceMiles: 2.8, address: '456 Howard St', city: 'San Francisco' },
      { name: 'Oakland Classic Cuts', distanceMiles: 8.5, address: '789 Broadway', city: 'Oakland' },
    ]
    setTimeout(() => {
      setResults(sample)
      setStatus('Done')
    }, 700)
  }

  return (
    <div className="agent">
      <div className="agent-header">
        <h3>AI Barber Finder</h3>
        <p className="muted">Find the nearest barbershop in the Bay Area</p>
      </div>
      <div className="agent-controls">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. fade, beard trim, walk-in"
          aria-label="Search barber service"
        />
        <button className="btn primary" onClick={simulateSearch} aria-label="Find nearby barbershops">
          Find nearby
        </button>
      </div>
      <p className="status">{status}{position ? ` · (${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)})` : ''}</p>
      {results.length > 0 && (
        <ul className="results">
          {results.map((r) => (
            <li key={r.name} className="result-item">
              <div>
                <strong>{r.name}</strong>
                <div className="muted">{r.address}, {r.city}</div>
              </div>
              <span className="badge">{r.distanceMiles.toFixed(1)} mi</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


