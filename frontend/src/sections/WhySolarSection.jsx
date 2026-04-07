import { useScrollReveal } from '../hooks/useScrollReveal';
import { WHY_SOLAR } from '../utils/constants';
import pic1 from '../assets/picture/homelighing image.png';
import pic2 from '../assets/picture/homelighing image2.png';
import pic3 from '../assets/picture/homelighting3.png';
import pic4 from '../assets/picture/homelighting 4.png';

const CARD_IMAGES = [pic1, pic2, pic3, pic4];

export default function WhySolarSection() {
  const titleRef = useScrollReveal({ threshold: 0.1 });
  const gridRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section id="why-solar" className="section-py" style={{ backgroundColor: 'var(--color-accent)', position: 'relative', overflow: 'hidden' }}>
      {/* subtle texture overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(0,0,0,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div ref={titleRef} className="fade-up text-center mb-5">
          <span
            className="badge mb-3 px-3 py-2"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <i className="bi bi-sun me-1"></i>
            Why Go Solar
          </span>
          <h2 className="section-title mb-3" style={{ color: '#ffffff' }}>Why Solar with Waterlift</h2>
          <div style={{ width: 48, height: 3, background: '#ffffff', margin: '0 auto 12px', borderRadius: 2, opacity: 0.5 }} />
          <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Beyond panels on a roof — a complete energy solution built specifically for Kenyan schools.
          </p>
        </div>

        <div
          ref={gridRef}
          className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 stagger-children"
        >
          {WHY_SOLAR.map((item, i) => (
            <div className="col" key={i}>
              <div
                className="card-reveal h-100 rounded-brand overflow-hidden"
                style={{
                  background: '#fff',
                  border: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
                }}
              >
                <div className="img-zoom" style={{ height: '210px', overflow: 'hidden' }}>
                  <img
                    src={CARD_IMAGES[i]}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                  }}
                />
                <div className="p-4">
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                      lineHeight: 1.3,
                      marginBottom: '10px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-gray)', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 16px' }}>
                    {item.description}
                  </p>
                  <a
                    href="#contact"
                    style={{
                      color: 'var(--color-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'gap 0.2s ease, color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.gap = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)';
                      e.currentTarget.style.gap = '4px';
                    }}
                  >
                    Learn More <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a
            href="#contact"
            className="text-decoration-none d-inline-flex align-items-center gap-2"
            style={{
              padding: '14px 36px',
              borderRadius: '10px',
              fontSize: '0.95rem',
              background: '#ffffff',
              color: 'var(--color-accent)',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = 'var(--color-accent)'; }}
          >
            <i className="bi bi-calendar-check"></i>
            Book Your Free School Audit Today
          </a>
        </div>
      </div>
    </section>
  );
}
