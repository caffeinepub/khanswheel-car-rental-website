import { useEffect, useState } from 'react';

interface OfferProps {
  onBookNow: () => void;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
}

const offers = [
  {
    title: 'Weekend Getaway',
    subtitle: '15% OFF',
    desc: 'Escape the city this weekend! Book any car for Fri–Sun and enjoy 15% off on the total rental.',
    gradient: 'linear-gradient(135deg, #1a3a6a 0%, #2d6a9f 100%)',
    hasTimer: true,
    timerDays: 3,
    badge: 'Limited Time',
    icon: 'fa-umbrella-beach',
  },
  {
    title: 'Corporate Package',
    subtitle: 'Monthly Plans',
    desc: 'Dedicated fleet for your business. Monthly rentals with priority support and GST invoicing.',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #2d5a3a 100%)',
    hasTimer: false,
    badge: 'Business',
    icon: 'fa-briefcase',
  },
  {
    title: 'Honeymoon Special',
    subtitle: '₹999 Extra',
    desc: 'Make your special day unforgettable. Decorated car, welcome flowers, and a professional chauffeur.',
    gradient: 'linear-gradient(135deg, #3a1a2a 0%, #7a3a5a 100%)',
    hasTimer: true,
    timerDays: 7,
    badge: 'Romantic',
    icon: 'fa-heart',
  },
  {
    title: 'Airport Transfer',
    subtitle: 'Fixed Price',
    desc: 'Stress-free airport pickups and drops. Fixed pricing, no surge charges, flight tracking included.',
    gradient: 'linear-gradient(135deg, #1a1a3a 0%, #3a3a7a 100%)',
    hasTimer: false,
    badge: 'Popular',
    icon: 'fa-plane',
  },
  {
    title: 'Outstation Trip',
    subtitle: 'Best Rates',
    desc: 'Explore India at the best per-km rates. Outstation trips with experienced drivers who know the routes.',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #6a4a1a 100%)',
    hasTimer: false,
    badge: 'Adventure',
    icon: 'fa-road',
  },
];

function CountdownTimer({ days }: { days: number }) {
  const target = new Date(Date.now() + days * 86400000);
  const t = useCountdown(target);
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      {[
        { val: t.days, label: 'Days' },
        { val: t.hours, label: 'Hrs' },
        { val: t.minutes, label: 'Min' },
        { val: t.seconds, label: 'Sec' },
      ].map(item => (
        <div key={item.label} style={{ textAlign: 'center' }}>
          <div style={{
            background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '4px 8px',
            fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5A623', minWidth: 36,
          }}>
            {String(item.val).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function OffersSection({ onBookNow }: OfferProps) {
  return (
    <section id="offers" style={{ background: '#FFFFFF', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Special Offers</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#0A1628', marginTop: 8, marginBottom: 16 }}>
            Exclusive Deals & Packages
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#666', maxWidth: 560, margin: '0 auto' }}>
            Festive season specials! Celebrate Diwali & Dussehra with our limited-time offers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'thin' }}>
          {offers.map((offer, i) => (
            <div
              key={i}
              style={{
                minWidth: 300, borderRadius: 20, overflow: 'hidden',
                background: offer.gradient, flexShrink: 0,
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)'; }}
            >
              <div style={{ padding: '28px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(245,166,35,0.2)', border: '1px solid rgba(245,166,35,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`fa-solid ${offer.icon}`} style={{ color: '#F5A623', fontSize: 20 }} aria-label={offer.title}></i>
                  </div>
                  <span style={{
                    background: 'rgba(245,166,35,0.9)', color: '#0A1628',
                    borderRadius: 100, padding: '4px 12px',
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
                  }}>
                    {offer.badge}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFFFFF', marginBottom: 4 }}>{offer.title}</h3>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24, color: '#F5A623', marginBottom: 12 }}>{offer.subtitle}</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 16 }}>{offer.desc}</p>
                {offer.hasTimer && offer.timerDays && <CountdownTimer days={offer.timerDays} />}
                <button
                  onClick={onBookNow}
                  style={{
                    marginTop: 20, width: '100%', padding: '12px',
                    background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                    color: '#0A1628', border: 'none', borderRadius: 10,
                    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  }}
                >
                  Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
