const posts = [
  {
    title: 'Top 10 Road Trip Destinations in India 2024',
    category: 'Travel Tips',
    excerpt: 'From the misty hills of Coorg to the golden deserts of Rajasthan, India offers some of the most breathtaking road trip routes in the world. Discover our curated list of must-drive destinations.',
    date: 'January 15, 2025',
    gradient: 'linear-gradient(135deg, #1a3a6a 0%, #2d6a9f 100%)',
    readTime: '8 min read',
  },
  {
    title: 'Self-Drive vs. Chauffeur: Which is Right for You?',
    category: 'Guides',
    excerpt: 'Choosing between self-drive and a chauffeur-driven car can be tricky. We break down the pros and cons of each option to help you make the best decision for your next trip.',
    date: 'December 28, 2024',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #2d5a3a 100%)',
    readTime: '5 min read',
  },
  {
    title: 'Tips for Renting a Car in India for the First Time',
    category: 'First-Timer',
    excerpt: 'Renting a car in India for the first time? Here\'s everything you need to know — from documents required and insurance to understanding toll charges and fuel policies.',
    date: 'December 10, 2024',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #6a4a1a 100%)',
    readTime: '6 min read',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" style={{ background: '#f8f9fa', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F5A623', letterSpacing: 2, textTransform: 'uppercase' }}>Our Blog</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#0A1628', marginTop: 8, marginBottom: 16 }}>
            Travel Insights & Tips
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#666', maxWidth: 500, margin: '0 auto' }}>
            Expert advice, travel guides, and insider tips to make every journey memorable.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="kw-blog-grid">
          {posts.map((post, i) => (
            <article
              key={i}
              style={{
                background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}
            >
              {/* Thumbnail */}
              <div style={{ height: 200, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <i className="fa-solid fa-newspaper" style={{ fontSize: 48, color: 'rgba(255,255,255,0.2)' }} aria-label="Blog post"></i>
                <div style={{
                  position: 'absolute', bottom: 16, left: 16,
                  background: '#F5A623', borderRadius: 100, padding: '4px 12px',
                  fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#0A1628',
                }}>
                  {post.category}
                </div>
              </div>
              <div style={{ padding: '24px 24px 20px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#999' }}>
                    <i className="fa-regular fa-calendar" style={{ marginRight: 4 }} aria-label="Date"></i>
                    {post.date}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#999' }}>
                    <i className="fa-regular fa-clock" style={{ marginRight: 4 }} aria-label="Read time"></i>
                    {post.readTime}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17, color: '#0A1628', marginBottom: 12, lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 20 }}>{post.excerpt}</p>
                <button
                  style={{
                    background: 'transparent', border: '2px solid #F5A623',
                    color: '#F5A623', borderRadius: 8, padding: '10px 20px',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.color = '#0A1628'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F5A623'; }}
                  onClick={() => alert(`Opening: ${post.title}`)}
                >
                  Read More <i className="fa-solid fa-arrow-right" aria-label="Read more"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .kw-blog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .kw-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
