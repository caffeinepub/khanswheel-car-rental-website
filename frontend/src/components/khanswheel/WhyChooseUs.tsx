import { useEffect, useRef, useState } from 'react';

const features = [
  { icon: 'fa-life-ring', title: '24/7 Roadside Assistance', desc: 'Round-the-clock support wherever you are in India. Our dedicated team is always ready to help.' },
  { icon: 'fa-map-location-dot', title: 'GPS-Enabled Vehicles', desc: 'All our vehicles are equipped with real-time GPS tracking for your safety and peace of mind.' },
  { icon: 'fa-hand-holding-dollar', title: 'No Hidden Charges', desc: 'Transparent pricing with all-inclusive rates. What you see is exactly what you pay.' },
  { icon: 'fa-shield-halved', title: 'Sanitized & Verified Cars', desc: 'Every vehicle is thoroughly sanitized and RTO-verified before each rental for your safety.' },
  { icon: 'fa-user-tie', title: 'Experienced Drivers', desc: 'Professional, background-verified drivers with 5+ years of experience across Indian roads.' },
  { icon: 'fa-rotate-left', title: 'Flexible Cancellation', desc: 'Plans change — we understand. Enjoy hassle-free cancellations up to 24 hours before pickup.' },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-choose-us" style={{ background: '#FFFFFF', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/generated/mandala-pattern.dim_600x600.png)',
        backgroundSize: '400px', backgroundRepeat: 'repeat',
        opacity: 0.03, pointerEvents: 'none',
      }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Why Choose Us</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#0A1628', marginTop: 8, marginBottom: 16 }}>
            The Khanswheel Difference
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#666', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            We go beyond just renting cars — we deliver premium experiences tailored for every journey across India.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="kw-features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(10,22,40,0.03)',
                border: '1px solid rgba(10,22,40,0.08)',
                borderRadius: 16, padding: '32px 28px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = '0 20px 50px rgba(245,166,35,0.15)';
                el.style.borderColor = 'rgba(245,166,35,0.4)';
                el.style.background = 'rgba(245,166,35,0.04)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                el.style.borderColor = 'rgba(10,22,40,0.08)';
                el.style.background = 'rgba(10,22,40,0.03)';
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, boxShadow: '0 8px 20px rgba(245,166,35,0.3)',
              }}>
                <i className={`fa-solid ${f.icon}`} style={{ color: '#0A1628', fontSize: 22 }} aria-label={f.title}></i>
              </div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#0A1628', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .kw-features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .kw-features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
