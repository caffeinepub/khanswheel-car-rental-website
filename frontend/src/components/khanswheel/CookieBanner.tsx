import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kw_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kw_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('kw_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1500,
      background: '#FFFFFF', borderTop: '3px solid #F5A623',
      padding: '16px 24px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <i className="fa-solid fa-cookie-bite" style={{ color: '#F5A623', fontSize: 24, flexShrink: 0 }} aria-label="Cookie"></i>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#2D2D2D', margin: 0, lineHeight: 1.5 }}>
          We use cookies to improve your experience on Khanswheel. By continuing, you agree to our{' '}
          <a href="#" style={{ color: '#F5A623', textDecoration: 'none', fontWeight: 600 }}>Cookie Policy</a>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleDecline}
          style={{
            padding: '9px 20px', background: 'transparent',
            border: '1.5px solid rgba(0,0,0,0.2)', borderRadius: 8,
            fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13,
            color: '#666', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#999'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: '9px 20px',
            background: 'linear-gradient(135deg, #F5A623, #e8941a)',
            border: 'none', borderRadius: 8,
            fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13,
            color: '#0A1628', cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(245,166,35,0.3)',
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
