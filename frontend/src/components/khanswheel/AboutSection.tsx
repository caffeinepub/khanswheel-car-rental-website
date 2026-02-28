const team = [
  { initials: 'AK', name: 'Arjun Khan', role: 'Founder & CEO', bio: 'With 15+ years in the automotive industry, Arjun founded Khanswheel with a vision to revolutionize car rentals in India. His passion for premium service drives our company culture.', color: '#1a3a6a' },
  { initials: 'NP', name: 'Neha Patel', role: 'Head of Operations', bio: 'Neha oversees our fleet of 500+ vehicles across 50+ cities. Her operational expertise ensures every customer gets a seamless, on-time experience every single time.', color: '#3a1a2a' },
  { initials: 'RS', name: 'Rahul Sharma', role: 'Chief Technology Officer', bio: 'Rahul leads our digital transformation, building the technology that powers real-time bookings, GPS tracking, and our 24/7 customer support platform.', color: '#1a3a2a' },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ background: '#0A1628', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Mandala pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/generated/mandala-pattern.dim_600x600.png)',
        backgroundSize: '500px', backgroundRepeat: 'repeat',
        opacity: 0.04, pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>About Us</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#FFFFFF', marginTop: 8, marginBottom: 16 }}>
            Our Story
          </h2>
        </div>

        {/* Company Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 80, alignItems: 'center' }} className="kw-about-grid">
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 24 }}>
              Founded in 2020 in the heart of Mumbai, Khanswheel was born from a simple belief: every journey deserves a premium experience. What started as a small fleet of 10 cars has grown into India's most trusted premium car rental service with 500+ vehicles across 50+ cities.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 32 }}>
              We combine cutting-edge technology with warm Indian hospitality to deliver car rental experiences that go beyond transportation. From corporate fleets to honeymoon specials, we're there for every milestone of your journey.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ borderLeft: '3px solid #F5A623', paddingLeft: 16 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5A623', marginBottom: 8 }}>Our Mission</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  To make premium car rentals accessible to every Indian traveller with transparency, safety, and exceptional service.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid #F5A623', paddingLeft: 16 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5A623', marginBottom: 8 }}>Our Vision</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  To be India's #1 premium car rental brand, known for reliability, innovation, and world-class customer experience.
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { num: '500+', label: 'Premium Vehicles' },
              { num: '50+', label: 'Cities Covered' },
              { num: '10K+', label: 'Happy Customers' },
              { num: '5 Yrs', label: 'Of Excellence' },
            ].map(item => (
              <div key={item.label} style={{
                background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)',
                borderRadius: 16, padding: '28px 20px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 36, color: '#F5A623' }}>{item.num}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 28, color: '#FFFFFF' }}>Meet Our Team</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="kw-team-grid">
          {team.map((member, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)'; e.currentTarget.style.background = 'rgba(245,166,35,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 28, color: '#FFFFFF',
                margin: '0 auto 20px',
                border: '3px solid rgba(245,166,35,0.4)',
              }}>
                {member.initials}
              </div>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFFFFF', marginBottom: 4 }}>{member.name}</h4>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#F5A623', fontWeight: 600, marginBottom: 16 }}>{member.role}</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .kw-about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .kw-team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
