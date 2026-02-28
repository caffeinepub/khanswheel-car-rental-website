import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid phone number';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setErrors({});
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%', padding: '12px 16px', borderRadius: 10,
    border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(0,0,0,0.15)'}`,
    fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#2D2D2D',
    outline: 'none', background: '#FFFFFF', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  return (
    <section id="contact" style={{ background: '#FFFFFF', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Contact Us</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#0A1628', marginTop: 8, marginBottom: 16 }}>
            Get In Touch
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#666', maxWidth: 500, margin: '0 auto' }}>
            Have a question or need a custom quote? Our team is ready to help you plan the perfect journey.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="kw-contact-grid">
          {/* Contact Form */}
          <div>
            {submitted ? (
              <div style={{
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 16, padding: '40px', textAlign: 'center',
              }}>
                <i className="fa-solid fa-circle-check" style={{ color: '#22c55e', fontSize: 48, marginBottom: 16 }} aria-label="Success"></i>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#0A1628', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#666' }}>Thank you! We will contact you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 20, background: '#F5A623', color: '#0A1628',
                    border: 'none', borderRadius: 8, padding: '10px 24px',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0A1628', display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Rajesh Kumar"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle(!!errors.name)}
                  />
                  {errors.name && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.name}</p>}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0A1628', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={inputStyle(!!errors.phone)}
                  />
                  {errors.phone && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.phone}</p>}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0A1628', display: 'block', marginBottom: 6 }}>Email Address *</label>
                  <input
                    type="email"
                    placeholder="rajesh@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle(!!errors.email)}
                  />
                  {errors.email && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.email}</p>}
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0A1628', display: 'block', marginBottom: 6 }}>Message *</label>
                  <textarea
                    placeholder="Tell us about your travel requirements..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={5}
                    style={{ ...inputStyle(!!errors.message), resize: 'vertical' }}
                  />
                  {errors.message && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '14px',
                    background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                    color: '#0A1628', border: 'none', borderRadius: 10,
                    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(245,166,35,0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <i className="fa-solid fa-paper-plane" style={{ marginRight: 8 }} aria-label="Send"></i>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div>
            <div style={{ marginBottom: 32 }}>
              {[
                { icon: 'fa-phone', label: 'Phone', value: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 9 PM' },
                { icon: 'fa-envelope', label: 'Email', value: 'support@khanswheel.com', sub: 'We reply within 24 hours' },
                { icon: 'fa-location-dot', label: 'Address', value: '42, Bandra Kurla Complex, Mumbai', sub: 'Maharashtra 400051' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`fa-solid ${item.icon}`} style={{ color: '#F5A623', fontSize: 18 }} aria-label={item.label}></i>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#0A1628' }}>{item.value}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#999', marginTop: 2 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '24px', marginBottom: 24 }}>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>
                <i className="fa-solid fa-clock" style={{ color: '#F5A623', marginRight: 8 }} aria-label="Hours"></i>
                Business Hours
              </h4>
              {[
                { day: 'Monday – Friday', hours: '9:00 AM – 9:00 PM' },
                { day: 'Saturday', hours: '9:00 AM – 7:00 PM' },
                { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
                { day: 'Emergency Support', hours: '24/7 Available' },
              ].map(row => (
                <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#555' }}>{row.day}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#0A1628' }}>{row.hours}</span>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div style={{
              height: 180, background: 'linear-gradient(135deg, #e8edf2 0%, #d0d8e4 100%)',
              borderRadius: 16, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              border: '1px solid rgba(0,0,0,0.1)',
            }}>
              <i className="fa-solid fa-map" style={{ fontSize: 36, color: '#0A1628', opacity: 0.3 }} aria-label="Map"></i>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666' }}>Bandra Kurla Complex, Mumbai</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#999' }}>View on Google Maps</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .kw-contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
