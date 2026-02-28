import { useState, useEffect } from 'react';

interface HeaderProps {
  onBookNow: () => void;
}

export default function Header({ onBookNow }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Booking', href: '#booking' },
    { label: 'Offers', href: '#offers' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`kw-header ${scrolled ? 'kw-header--scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled ? '#0A1628' : 'transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
          padding: '0 24px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => scrollTo('#home')}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'linear-gradient(135deg, #F5A623, #e8941a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 15px rgba(245,166,35,0.4)'
            }}>
              <i className="fa-solid fa-dharmachakra" style={{ color: '#0A1628', fontSize: 20 }} aria-label="Khanswheel logo wheel"></i>
            </div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Khans<span style={{ color: '#F5A623' }}>wheel</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="kw-desktop-nav">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14,
                  color: '#FFFFFF', opacity: 0.9, transition: 'all 0.2s',
                  padding: '4px 0',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#F5A623'; (e.target as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#FFFFFF'; (e.target as HTMLElement).style.opacity = '0.9'; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="kw-header-right">
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500 }} className="kw-phone-link">
              <i className="fa-solid fa-phone" style={{ color: '#F5A623', fontSize: 13 }} aria-label="Phone"></i>
              <span>+91 98765 43210</span>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: 20 }} aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <button
              onClick={onBookNow}
              style={{
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                color: '#0A1628', border: 'none', borderRadius: 6,
                padding: '10px 22px', fontFamily: 'Poppins, sans-serif',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(245,166,35,0.3)',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 6px 20px rgba(245,166,35,0.5)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'translateY(0)'; (e.target as HTMLElement).style.boxShadow = '0 4px 15px rgba(245,166,35,0.3)'; }}
            >
              Book Now
            </button>
            {/* Hamburger */}
            <button
              className="kw-hamburger"
              onClick={() => setMenuOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: 22, display: 'none' }}
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 2001,
          width: 280, background: '#0A1628',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          padding: '24px',
          boxShadow: '-4px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFFFFF' }}>
            Khans<span style={{ color: '#F5A623' }}>wheel</span>
          </span>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: 20, cursor: 'pointer' }} aria-label="Close menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16,
                color: '#FFFFFF', textAlign: 'left', padding: '12px 16px',
                borderRadius: 8, transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(245,166,35,0.15)'; (e.target as HTMLElement).style.color = '#F5A623'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = 'none'; (e.target as HTMLElement).style.color = '#FFFFFF'; }}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
          <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, marginBottom: 16 }}>
            <i className="fa-solid fa-phone" style={{ color: '#F5A623' }} aria-label="Phone"></i>
            +91 98765 43210
          </a>
          <button
            onClick={() => { onBookNow(); setMenuOpen(false); }}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #F5A623, #e8941a)',
              color: '#0A1628', border: 'none', borderRadius: 8,
              padding: '14px', fontFamily: 'Poppins, sans-serif',
              fontWeight: 700, fontSize: 16, cursor: 'pointer',
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kw-desktop-nav { display: none !important; }
          .kw-phone-link { display: none !important; }
          .kw-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
