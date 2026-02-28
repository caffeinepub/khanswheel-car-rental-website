const steps = [
  { num: 1, icon: 'fa-car', title: 'Choose Your Car', desc: 'Browse our fleet of 500+ premium vehicles and select the perfect car for your journey.' },
  { num: 2, icon: 'fa-calendar-days', title: 'Pick Location & Date', desc: 'Select your pickup city, drop location, and travel dates. We cover 50+ cities across India.' },
  { num: 3, icon: 'fa-credit-card', title: 'Confirm & Pay', desc: 'Secure payment via UPI, card, or net banking. Instant booking confirmation on WhatsApp.' },
  { num: 4, icon: 'fa-road', title: 'Enjoy Your Ride', desc: 'Your sanitized, GPS-enabled car arrives on time. Sit back and enjoy the journey!' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#f8f9fa', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>How It Works</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#0A1628', marginTop: 8, marginBottom: 16 }}>
            Book in 4 Simple Steps
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#666', maxWidth: 500, margin: '0 auto' }}>
            Getting your dream car has never been easier. Follow these simple steps and hit the road!
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }} className="kw-steps-container">
          {steps.map((step, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: 36, left: '50%', right: '-50%',
                  height: 2, borderTop: '3px dashed #F5A623',
                  opacity: 0.4, zIndex: 0,
                }} className="kw-step-connector" />
              )}
              {/* Step circle */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(245,166,35,0.4)',
                position: 'relative', zIndex: 1, marginBottom: 20,
                flexShrink: 0,
              }}>
                <i className={`fa-solid ${step.icon}`} style={{ color: '#0A1628', fontSize: 26 }} aria-label={step.title}></i>
                <div style={{
                  position: 'absolute', top: -8, right: -8,
                  width: 26, height: 26, borderRadius: '50%',
                  background: '#0A1628', border: '2px solid #F5A623',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 12, color: '#F5A623',
                }}>
                  {step.num}
                </div>
              </div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17, color: '#0A1628', marginBottom: 10, textAlign: 'center' }}>{step.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 1.6, maxWidth: 200 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .kw-steps-container { flex-direction: column !important; align-items: flex-start !important; gap: 32px !important; }
          .kw-step-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
