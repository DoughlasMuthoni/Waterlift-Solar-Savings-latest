import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FALLBACK_TESTIMONIALS } from '../utils/constants';
import api from '../utils/api';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #262161 0%, #3730a3 100%)',
  'linear-gradient(135deg, #EF6922 0%, #f5883f 100%)',
  'linear-gradient(135deg, #1a1745 0%, #262161 100%)',
];

function StarRating({ rating }) {
  return (
    <div className="d-flex gap-1 mb-3">
      {[1,2,3,4,5].map((s) => (
        <i
          key={s}
          className={`bi ${s <= rating ? 'bi-star-fill' : 'bi-star'}`}
          style={{ color: 'var(--color-accent)', fontSize: '0.88rem' }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const titleRef = useScrollReveal();
  const gridRef  = useScrollReveal();
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    api.get('/api/testimonials')
      .then((res) => {
        const data = res.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data.map((t) => ({
            id: t.id, quote: t.quote,
            author: t.author_name, role: t.role || '',
            school: t.school_name, type: t.school_type || '',
            students: t.students || '', system: t.system_size || '',
            rating: t.rating || 5,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials" className="section-py" style={{ backgroundColor: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative circles */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container position-relative" style={{ zIndex: 1 }}>

        {/* Heading */}
        <div ref={titleRef} className="fade-up text-center mb-5">
          <span className="section-badge mb-3" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            <i className="bi bi-chat-quote-fill"></i>
            School Stories
          </span>
          <h2 className="section-title mb-3" style={{ color: '#ffffff' }}>What School Leaders Say</h2>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Real results from real Kenyan schools — the stories that matter most.
          </p>
        </div>

        <div ref={gridRef} className="row row-cols-1 row-cols-md-3 g-4 stagger-children">
          {testimonials.map((t, i) => (
            <div className="col" key={t.id || i}>
              <div
                className="fade-up h-100 rounded-brand-lg position-relative"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                }}
              >
                {/* Gradient top strip */}
                <div style={{
                  height: '4px',
                  background: i % 2 === 0 ? 'var(--gradient-primary)' : 'var(--gradient-accent)',
                }} />

                <div className="p-4 p-lg-5">
                  {/* Large decorative quote */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 24, right: 24,
                      fontSize: '5rem',
                      lineHeight: 1,
                      fontFamily: 'Georgia, serif',
                      background: i % 2 === 0 ? 'var(--gradient-primary)' : 'var(--gradient-accent)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      opacity: 0.12,
                      userSelect: 'none',
                    }}
                  >
                    "
                  </div>

                  <StarRating rating={t.rating} />

                  <p style={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: '0.91rem',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    marginBottom: '24px',
                  }}>
                    "{t.quote}"
                  </p>

                  {/* Author row */}
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 48, height: 48,
                        borderRadius: '50%',
                        background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(38,33,97,0.25)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {(t.author || '?').charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>
                        {t.author}
                      </div>
                      {t.role && (
                        <div style={{ color: 'var(--color-accent)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {t.role}
                        </div>
                      )}
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>{t.school}</div>
                    </div>
                  </div>

                  {/* Meta chips */}
                  {(t.type || t.students || t.system) && (
                    <div className="d-flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      {t.type && (
                        <span style={{
                          background: 'rgba(255,255,255,0.12)',
                          color: '#fff',
                          borderRadius: '50px',
                          padding: '4px 12px',
                          fontSize: '0.71rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}>{t.type}</span>
                      )}
                      {t.students && (
                        <span style={{
                          background: 'rgba(239,105,34,0.10)',
                          color: 'var(--color-accent)',
                          borderRadius: '50px',
                          padding: '4px 12px',
                          fontSize: '0.71rem',
                          fontWeight: 700,
                        }}>{t.students}</span>
                      )}
                      {t.system && (
                        <span style={{
                          background: 'rgba(255,255,255,0.12)',
                          color: '#fff',
                          borderRadius: '50px',
                          padding: '4px 12px',
                          fontSize: '0.71rem',
                          fontWeight: 700,
                        }}>{t.system}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
