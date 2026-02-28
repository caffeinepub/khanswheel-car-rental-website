import { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: 'fa-car', value: 500, suffix: '+', label: 'Premium Cars', color: '#F5A623' },
  { icon: 'fa-map-location-dot', value: 50, suffix: '+', label: 'Cities Covered', color: '#F5A623' },
  { icon: 'fa-face-smile', value: 10000, suffix: '+', label: 'Happy Customers', color: '#F5A623' },
  { icon: 'fa-star', value: 5, suffix: '★', label: 'Average Rating', color: '#F5A623' },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatItem({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.value, 2000, active);
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(245,166,35,0.15)', border: '2px solid rgba(245,166,35,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <i className={`fa-solid ${stat.icon}`} style={{ color: '#F5A623', fontSize: 24 }} aria-label={stat.label}></i>
      </div>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: '#F5A623', lineHeight: 1 }}>
        {count.toLocaleString('en-IN')}{stat.suffix}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 8, fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#0A1628', padding: '60px 24px', borderTop: '1px solid rgba(245,166,35,0.2)', borderBottom: '1px solid rgba(245,166,35,0.2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="kw-stats-grid">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} active={active} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .kw-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .kw-stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
