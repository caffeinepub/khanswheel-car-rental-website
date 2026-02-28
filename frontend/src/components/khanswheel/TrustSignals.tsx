export default function TrustSignals() {
  const partners = ['Maruti Suzuki', 'Toyota', 'Honda', 'Mercedes-Benz', 'BMW'];
  const certs = [
    { icon: 'fa-certificate', label: 'ISO 9001:2015', sub: 'Certified' },
    { icon: 'fa-check-circle', label: 'RTO Compliant', sub: 'All Vehicles' },
    { icon: 'fa-file-invoice', label: 'GST Registered', sub: '27AABCU9603R1ZX' },
  ];

  return (
    <section id="trust-signals" style={{ background: '#FFFFFF', padding: '80px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Secure Payment Badge */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 100, padding: '10px 24px', marginBottom: 16,
          }}>
            <i className="fa-solid fa-lock" style={{ color: '#22c55e', fontSize: 16 }} aria-label="Secure"></i>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#22c55e' }}>100% Secure Payment</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#666' }}>SSL Encrypted</span>
          </div>
        </div>

        {/* Partner Brands */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#999', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>Our Fleet Partners</p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {partners.map(p => (
              <div
                key={p}
                style={{
                  padding: '12px 28px', borderRadius: 10,
                  border: '2px solid rgba(0,0,0,0.08)',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A1628',
                  transition: 'all 0.2s', cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#F5A623'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = '#0A1628'; }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {certs.map(cert => (
            <div
              key={cert.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#f8f9fa', borderRadius: 12, padding: '16px 24px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <i className={`fa-solid ${cert.icon}`} style={{ color: '#F5A623', fontSize: 24 }} aria-label={cert.label}></i>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A1628' }}>{cert.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#999' }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
