export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'khanswheel';

  const quickLinks = {
    Company: ['About Us', 'Blog', 'Careers', 'Press'],
    Support: ['Contact Us', 'FAQs', 'Help Center', 'Track Booking'],
    Legal: ['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Cookie Policy'],
  };

  const socials = [
    { icon: 'fa-brands fa-instagram', label: 'Instagram', href: '#' },
    { icon: 'fa-brands fa-facebook', label: 'Facebook', href: '#' },
    { icon: 'fa-brands fa-x-twitter', label: 'Twitter/X', href: '#' },
    { icon: 'fa-brands fa-youtube', label: 'YouTube', href: '#' },
  ];

  return (
    <footer style={{ background: '#060e1c', color: '#FFFFFF', padding: '80px 24px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="kw-footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fa-solid fa-dharmachakra" style={{ color: '#0A1628', fontSize: 18 }} aria-label="Khanswheel logo"></i>
              </div>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFFFFF' }}>
                Khans<span style={{ color: '#F5A623' }}>wheel</span>
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 8, maxWidth: 280 }}>
              Premium car rentals across India. Your journey, our responsibility.
            </p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#F5A623', fontStyle: 'italic', marginBottom: 24 }}>
              "आपकी यात्रा, हमारी जिम्मेदारी"
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)', fontSize: 16, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.color = '#0A1628'; e.currentTarget.style.borderColor = '#F5A623'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Subscribe for exclusive offers:</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none',
                  }}
                />
                <button
                  style={{
                    padding: '10px 16px', background: '#F5A623', color: '#0A1628',
                    border: 'none', borderRadius: 8, fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(quickLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF', marginBottom: 20 }}>{section}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(link => (
                  <li key={link} style={{ marginBottom: 12 }}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#F5A623'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
              GST: 27AABCU9603R1ZX &nbsp;|&nbsp; CIN: U63040MH2020PTC123456
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              © {year} Khanswheel. All rights reserved. &nbsp;|&nbsp;
              Built with <span style={{ color: '#F5A623' }}>♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#F5A623', textDecoration: 'none' }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms & Conditions', 'Refund Policy'].map(link => (
              <a
                key={link}
                href="#"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F5A623'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .kw-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .kw-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
