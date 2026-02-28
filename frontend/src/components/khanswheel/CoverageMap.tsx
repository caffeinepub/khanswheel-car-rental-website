import { useState } from 'react';

const cities = [
  { name: 'Delhi', cars: 145, x: 42, y: 22 },
  { name: 'Jaipur', cars: 68, x: 35, y: 32 },
  { name: 'Mumbai', cars: 120, x: 28, y: 52 },
  { name: 'Pune', cars: 85, x: 30, y: 57 },
  { name: 'Hyderabad', cars: 92, x: 42, y: 62 },
  { name: 'Bangalore', cars: 110, x: 40, y: 72 },
  { name: 'Chennai', cars: 78, x: 46, y: 76 },
  { name: 'Kolkata', cars: 65, x: 65, y: 38 },
];

export default function CoverageMap() {
  const [tooltip, setTooltip] = useState<{ city: string; cars: number; x: number; y: number } | null>(null);

  return (
    <section style={{ background: '#0A1628', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Coverage</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#FFFFFF', marginTop: 8, marginBottom: 16 }}>
            We're Across India
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto' }}>
            Operating in 50+ cities with 500+ premium vehicles. Hover over a city to see availability.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="kw-map-grid">
          {/* SVG Map */}
          <div style={{ position: 'relative', maxWidth: 500, margin: '0 auto', width: '100%' }}>
            <svg viewBox="0 0 100 110" style={{ width: '100%', filter: 'drop-shadow(0 0 20px rgba(245,166,35,0.1))' }}>
              {/* Simplified India outline */}
              <path
                d="M35,5 L55,5 L65,12 L72,20 L75,30 L72,38 L68,42 L70,50 L65,58 L60,65 L55,72 L50,80 L46,85 L42,80 L38,72 L32,65 L28,58 L25,50 L22,42 L20,35 L22,25 L28,15 Z"
                fill="rgba(245,166,35,0.08)"
                stroke="rgba(245,166,35,0.3)"
                strokeWidth="0.8"
              />
              {/* City pins */}
              {cities.map(city => (
                <g key={city.name}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="2.5"
                    fill="#F5A623"
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={() => setTooltip({ city: city.name, cars: city.cars, x: city.x, y: city.y })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="4"
                    fill="rgba(245,166,35,0.2)"
                    style={{ cursor: 'pointer', pointerEvents: 'none' }}
                  />
                  <text
                    x={city.x + 4}
                    y={city.y + 1}
                    fontSize="3"
                    fill="rgba(255,255,255,0.7)"
                    style={{ pointerEvents: 'none', fontFamily: 'Inter, sans-serif' }}
                  >
                    {city.name}
                  </text>
                </g>
              ))}
              {/* Tooltip */}
              {tooltip && (
                <g>
                  <rect x={tooltip.x - 15} y={tooltip.y - 14} width="40" height="12" rx="2" fill="#0A1628" stroke="#F5A623" strokeWidth="0.5" />
                  <text x={tooltip.x + 5} y={tooltip.y - 7} fontSize="2.8" fill="#F5A623" textAnchor="middle" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                    {tooltip.city}
                  </text>
                  <text x={tooltip.x + 5} y={tooltip.y - 3.5} fontSize="2.4" fill="rgba(255,255,255,0.8)" textAnchor="middle">
                    {tooltip.cars} cars
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* City List */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {cities.map(city => (
                <div
                  key={city.name}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: '16px 20px',
                    transition: 'all 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)'; e.currentTarget.style.background = 'rgba(245,166,35,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <i className="fa-solid fa-location-dot" style={{ color: '#F5A623', fontSize: 14 }} aria-label="Location"></i>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#FFFFFF' }}>{city.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{city.cars} cars available</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .kw-map-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
