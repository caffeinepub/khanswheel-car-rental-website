import { useEffect, useState } from 'react';

export default function FloatingElements() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: 90, right: 24, zIndex: 800,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          textDecoration: 'none', color: '#FFFFFF', fontSize: 26,
          animation: 'kwWhatsappBounce 2s infinite',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Back to Top */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: 'fixed', bottom: 160, right: 24, zIndex: 800,
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F5A623, #e8941a)',
            border: 'none', cursor: 'pointer', color: '#0A1628', fontSize: 18,
            boxShadow: '0 4px 15px rgba(245,166,35,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}

      {/* Live Chat Button */}
      <button
        aria-label="Live chat"
        onClick={() => alert('Live chat coming soon! Please WhatsApp us at +91 98765 43210')}
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 800,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#0A1628', border: '2px solid #F5A623',
          borderRadius: 100, padding: '10px 18px', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#0A1628'; }}
      >
        <i className="fa-solid fa-comments" style={{ color: '#F5A623', fontSize: 18 }} aria-hidden="true"></i>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623' }}>Live Chat</span>
      </button>

      <style>{`
        @keyframes kwWhatsappBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}
