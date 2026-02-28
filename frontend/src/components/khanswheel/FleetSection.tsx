import { useState } from 'react';
import { Vehicle, vehicles } from '../../data/vehicles';

interface FleetSectionProps {
  onBookNow: (vehicle: Vehicle) => void;
  onAddToCompare: (vehicle: Vehicle) => void;
  compareList: Vehicle[];
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'hatchback', label: 'Hatchback' },
  { key: 'sedan', label: 'Sedan' },
  { key: 'suv', label: 'SUV' },
  { key: 'luxury', label: 'Luxury' },
  { key: 'tempo', label: 'Tempo Traveller' },
];

export default function FleetSection({ onBookNow, onAddToCompare, compareList }: FleetSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? vehicles : vehicles.filter(v => v.category === activeCategory);

  return (
    <section id="fleet" style={{ background: '#0A1628', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Our Fleet</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#FFFFFF', marginTop: 8, marginBottom: 16 }}>
            Choose Your Perfect Ride
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
            From budget-friendly hatchbacks to ultra-luxury sedans — we have the perfect car for every occasion.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '10px 22px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                background: activeCategory === cat.key ? '#F5A623' : 'rgba(255,255,255,0.08)',
                color: activeCategory === cat.key ? '#0A1628' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat.key ? '0 4px 15px rgba(245,166,35,0.4)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="kw-fleet-grid">
          {filtered.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onBookNow={onBookNow}
              onAddToCompare={onAddToCompare}
              isInCompare={compareList.some(v => v.id === vehicle.id)}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .kw-fleet-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .kw-fleet-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function VehicleCard({ vehicle, onBookNow, onAddToCompare, isInCompare }: {
  vehicle: Vehicle;
  onBookNow: (v: Vehicle) => void;
  onAddToCompare: (v: Vehicle) => void;
  isInCompare: boolean;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16, overflow: 'hidden',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    >
      {/* Car Image Placeholder */}
      <div style={{
        height: 180, background: vehicle.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)',
        }} />
        <i className={`fa-solid ${vehicle.icon}`} style={{ fontSize: 64, color: 'rgba(255,255,255,0.2)', position: 'relative' }} aria-label={vehicle.name}></i>
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(245,166,35,0.9)', borderRadius: 6,
          padding: '4px 10px', fontFamily: 'Poppins, sans-serif',
          fontWeight: 700, fontSize: 13, color: '#0A1628',
        }}>
          {vehicle.category === 'hatchback' ? 'Hatchback' :
            vehicle.category === 'sedan' ? 'Sedan' :
              vehicle.category === 'suv' ? 'SUV' :
                vehicle.category === 'luxury' ? 'Luxury' : 'Tempo'}
        </div>
      </div>

      <div style={{ padding: '20px 20px 16px' }}>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFFFFF', marginBottom: 4 }}>{vehicle.name}</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{vehicle.model}</p>

        {/* Specs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            { icon: 'fa-users', label: `${vehicle.seats} Seats` },
            { icon: 'fa-gas-pump', label: vehicle.fuel },
            { icon: 'fa-snowflake', label: vehicle.ac ? 'AC' : 'Non-AC' },
            { icon: 'fa-suitcase', label: vehicle.luggage },
          ].map((spec, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className={`fa-solid ${spec.icon}`} style={{ color: '#F5A623', fontSize: 12, width: 14 }} aria-label={spec.label}></i>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{spec.label}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 26, color: '#F5A623' }}>
            ₹{vehicle.pricePerDay.toLocaleString('en-IN')}
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>/day</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>+ GST</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onBookNow(vehicle)}
              style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: 8, cursor: 'pointer',
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                color: '#0A1628', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(245,166,35,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              Book Now
            </button>
            <button
              style={{
                flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#F5A623'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              View Details
            </button>
          </div>
          <button
            onClick={() => onAddToCompare(vehicle)}
            style={{
              width: '100%', padding: '8px', borderRadius: 8, cursor: 'pointer',
              background: isInCompare ? 'rgba(245,166,35,0.2)' : 'transparent',
              border: `1px solid ${isInCompare ? '#F5A623' : 'rgba(255,255,255,0.1)'}`,
              color: isInCompare ? '#F5A623' : 'rgba(255,255,255,0.5)',
              fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12,
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <i className={`fa-solid ${isInCompare ? 'fa-check' : 'fa-plus'}`} aria-label={isInCompare ? 'Added to compare' : 'Add to compare'}></i>
            {isInCompare ? 'Added to Compare' : 'Add to Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}
