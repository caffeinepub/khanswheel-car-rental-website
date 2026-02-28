import { useState, useEffect } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete';

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip' | 'hourly'>('oneway');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const today = new Date().toISOString().slice(0, 16);

  useEffect(() => {
    setPickupDate(today);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setReturnDate(tomorrow.toISOString().slice(0, 16));
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A1628 0%, #0d2040 30%, #1a3a6a 60%, #0A1628 100%)',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/generated/hero-banner.dim_1920x1080.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.3,
      }} />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 50%, rgba(10,22,40,0.88) 100%)',
      }} />
      {/* Decorative gold lines */}
      <div style={{
        position: 'absolute', top: '20%', right: '5%',
        width: 300, height: 300, borderRadius: '50%',
        border: '1px solid rgba(245,166,35,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '15%', right: '8%',
        width: 200, height: 200, borderRadius: '50%',
        border: '1px solid rgba(245,166,35,0.15)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '100px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="kw-hero-grid">
          {/* Left: Text */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
            }}>
              <i className="fa-solid fa-star" style={{ color: '#F5A623', fontSize: 12 }} aria-label="Premium"></i>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#F5A623', fontWeight: 500 }}>Premium Car Rental Service</span>
            </div>
            <h1 style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1,
              color: '#FFFFFF', marginBottom: 20,
            }}>
              Drive Your Journey,<br />
              <span style={{ color: '#F5A623' }}>Your Way</span>
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7, marginBottom: 12, maxWidth: 480,
            }}>
              Experience premium car rentals across India with 500+ vehicles, professional drivers, and 24/7 support.
            </p>
            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#F5A623',
              fontStyle: 'italic', marginBottom: 32,
            }}>
              "आपकी यात्रा, हमारी जिम्मेदारी"
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fa-solid fa-shield-halved" style={{ color: '#F5A623' }} aria-label="Verified"></i>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>RTO Verified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fa-solid fa-headset" style={{ color: '#F5A623' }} aria-label="Support"></i>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>24/7 Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fa-solid fa-indian-rupee-sign" style={{ color: '#F5A623' }} aria-label="No hidden charges"></i>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>No Hidden Charges</span>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: 32,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#FFFFFF', marginBottom: 20 }}>
              Book Your Ride
            </h2>
            {/* Trip Type Toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 4 }}>
              {(['oneway', 'roundtrip', 'hourly'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  style={{
                    flex: 1, padding: '8px 4px', border: 'none', borderRadius: 8, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                    background: tripType === type ? '#F5A623' : 'transparent',
                    color: tripType === type ? '#0A1628' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s',
                  }}
                >
                  {type === 'oneway' ? 'One Way' : type === 'roundtrip' ? 'Round Trip' : 'Hourly'}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* Pickup Location */}
              <div style={{ position: 'relative' }}>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
                  <i className="fa-solid fa-location-dot" style={{ color: '#F5A623', marginRight: 4 }} aria-label="Pickup"></i>
                  Pickup Location
                </label>
                <PlacesAutocomplete
                  value={pickup}
                  onChange={setPickup}
                  placeholder="Search pickup place..."
                  dropdownBg="#0A1628"
                />
              </div>

              {/* Drop Location */}
              <div style={{ position: 'relative' }}>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
                  <i className="fa-solid fa-location-dot" style={{ color: '#F5A623', marginRight: 4 }} aria-label="Drop"></i>
                  Drop Location
                </label>
                <PlacesAutocomplete
                  value={drop}
                  onChange={setDrop}
                  placeholder="Search drop place..."
                  dropdownBg="#0A1628"
                />
              </div>

              {/* Pickup Date */}
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
                  <i className="fa-solid fa-calendar" style={{ color: '#F5A623', marginRight: 4 }} aria-label="Pickup date"></i>
                  Pickup Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={pickupDate}
                  min={today}
                  onChange={e => setPickupDate(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none',
                    colorScheme: 'dark',
                  }}
                />
              </div>

              {/* Return Date */}
              {tripType !== 'hourly' && (
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
                    <i className="fa-solid fa-calendar-check" style={{ color: '#F5A623', marginRight: 4 }} aria-label="Return date"></i>
                    Return Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={returnDate}
                    min={pickupDate || today}
                    onChange={e => setReturnDate(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8,
                      background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none',
                      colorScheme: 'dark',
                    }}
                  />
                </div>
              )}
            </div>

            <button
              onClick={onBookNow}
              style={{
                width: '100%', marginTop: 20,
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                color: '#0A1628', border: 'none', borderRadius: 10,
                padding: '14px', fontFamily: 'Poppins, sans-serif',
                fontWeight: 700, fontSize: 16, cursor: 'pointer',
                transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(245,166,35,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { (e.currentTarget).style.transform = 'translateY(-2px)'; (e.currentTarget).style.boxShadow = '0 8px 30px rgba(245,166,35,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget).style.transform = 'translateY(0)'; (e.currentTarget).style.boxShadow = '0 4px 20px rgba(245,166,35,0.4)'; }}
            >
              <i className="fa-solid fa-magnifying-glass" aria-label="Search"></i>
              Search Cars
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'kwBounce 2s infinite',
      }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Scroll Down</span>
        <i className="fa-solid fa-chevron-down" style={{ color: '#F5A623', fontSize: 16 }} aria-label="Scroll down"></i>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kw-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @keyframes kwBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
