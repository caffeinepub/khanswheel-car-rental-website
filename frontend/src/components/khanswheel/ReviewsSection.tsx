import { useEffect, useRef, useState } from 'react';

const reviews = [
  { name: 'Rajesh Kumar', initials: 'RK', city: 'Mumbai', rating: 5, text: 'Absolutely fantastic service! The Innova Crysta was spotless and the driver was extremely professional. Will definitely book again for our next family trip.', date: 'Dec 2024', color: '#1a3a6a' },
  { name: 'Priya Sharma', initials: 'PS', city: 'Delhi', rating: 5, text: 'Booked a Mercedes C-Class for our anniversary and it was perfect. Decorated beautifully, driver was punctual. Khanswheel made our day special!', date: 'Nov 2024', color: '#3a1a2a' },
  { name: 'Amit Patel', initials: 'AP', city: 'Ahmedabad', rating: 5, text: 'Used the airport transfer service multiple times. Always on time, clean cars, and no hidden charges. Best car rental in Gujarat!', date: 'Jan 2025', color: '#1a3a2a' },
  { name: 'Sunita Reddy', initials: 'SR', city: 'Hyderabad', rating: 4, text: 'Great experience overall. The Fortuner was in excellent condition for our Ooty trip. GPS was very helpful on mountain roads.', date: 'Dec 2024', color: '#2a1a3a' },
  { name: 'Vikram Singh', initials: 'VS', city: 'Jaipur', rating: 5, text: 'Rented a Tempo Traveller for a family pilgrimage to Vaishno Devi. Comfortable, reliable, and the driver knew all the routes perfectly.', date: 'Oct 2024', color: '#2a2a1a' },
  { name: 'Meera Nair', initials: 'MN', city: 'Bangalore', rating: 5, text: 'The self-drive Swift was perfect for my weekend Coorg trip. Easy booking process, transparent pricing, and 24/7 support is a huge plus!', date: 'Jan 2025', color: '#1a2a3a' },
  { name: 'Arjun Mehta', initials: 'AM', city: 'Pune', rating: 5, text: 'Corporate account with Khanswheel has been a game-changer for our team. Reliable, professional, and the GST invoicing is seamless.', date: 'Feb 2025', color: '#3a2a1a' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <i key={i} className={`fa-${i <= rating ? 'solid' : 'regular'} fa-star`} style={{ color: '#F5A623', fontSize: 13 }} aria-label={`${i} star`}></i>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCount = 3;

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % (reviews.length - visibleCount + 1));
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const pause = () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  const resume = () => startAuto();

  const prev = () => { setCurrent(c => Math.max(0, c - 1)); };
  const next = () => { setCurrent(c => Math.min(reviews.length - visibleCount, c + 1)); };

  const ratingBreakdown = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ];

  return (
    <section id="reviews" style={{ background: '#FFFFFF', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Customer Reviews</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#0A1628', marginTop: 8, marginBottom: 16 }}>
            What Our Customers Say
          </h2>
        </div>

        {/* Rating Summary */}
        <div style={{
          display: 'flex', gap: 48, alignItems: 'center', justifyContent: 'center',
          background: '#f8f9fa', borderRadius: 20, padding: '32px 40px', marginBottom: 48,
          flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 64, color: '#0A1628', lineHeight: 1 }}>4.8</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 3, margin: '8px 0' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#F5A623', fontSize: 18 }} aria-label={`${i} star`}></i>
              ))}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666' }}>Based on 2,847 reviews</div>
          </div>
          <div style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
            {ratingBreakdown.map(r => (
              <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#666', width: 20 }}>{r.stars}★</span>
                <div style={{ flex: 1, height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${r.pct}%`, height: '100%', background: '#F5A623', borderRadius: 4 }} />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#666', width: 32 }}>{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative' }} onMouseEnter={pause} onMouseLeave={resume}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              display: 'flex', gap: 24,
              transform: `translateX(calc(-${current * (100 / visibleCount)}% - ${current * 8}px))`,
              transition: 'transform 0.5s ease',
            }}>
              {reviews.map((review, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: `calc(${100 / visibleCount}% - 16px)`,
                    background: '#FFFFFF', borderRadius: 16,
                    border: '1px solid rgba(0,0,0,0.08)',
                    padding: '28px 24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: review.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF',
                      flexShrink: 0,
                    }}>
                      {review.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#0A1628' }}>{review.name}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#999' }}>{review.city}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <StarRating rating={review.rating} />
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#bbb', marginTop: 4 }}>{review.date}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#555', lineHeight: 1.7, fontStyle: 'italic' }}>
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
            <button
              onClick={prev}
              disabled={current === 0}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: '2px solid #F5A623',
                background: 'transparent', color: '#F5A623', cursor: current === 0 ? 'not-allowed' : 'pointer',
                opacity: current === 0 ? 0.4 : 1, fontSize: 16, transition: 'all 0.2s',
              }}
              aria-label="Previous review"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={next}
              disabled={current >= reviews.length - visibleCount}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: '2px solid #F5A623',
                background: 'transparent', color: '#F5A623', cursor: current >= reviews.length - visibleCount ? 'not-allowed' : 'pointer',
                opacity: current >= reviews.length - visibleCount ? 0.4 : 1, fontSize: 16, transition: 'all 0.2s',
              }}
              aria-label="Next review"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
