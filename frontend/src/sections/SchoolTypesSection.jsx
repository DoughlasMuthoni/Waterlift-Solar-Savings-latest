import { useScrollReveal } from '../hooks/useScrollReveal';
import { SCHOOL_TYPES } from '../utils/constants';

export default function SchoolTypesSection() {
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="school-types" className="section-py" style={{ backgroundColor: 'var(--color-accent)', position: 'relative', overflow: 'hidden' }}>
      {/* subtle texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,0,0,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div ref={titleRef} className="fade-up text-center mb-5">
          <h2 className="section-title mb-3" style={{ color: '#ffffff' }}>Built for Every Kenyan School</h2>
          <div style={{ width: 48, height: 3, background: '#ffffff', margin: '0 auto 12px', borderRadius: 2, opacity: 0.5 }} />
          <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Whether you run a small public day school in a rural county or a large private boarding institution in Nairobi, Waterlift Solar has a solution designed specifically for your school's energy profile.
          </p>
        </div>

        <div ref={gridRef} className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 stagger-children">
          {SCHOOL_TYPES.map((type, i) => (
            <div className="col" key={i}>
              <div
                className="fade-up h-100 text-center p-4 rounded-brand"
                style={{
                  background: '#fff',
                  border: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                }}
              >
                <div
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    background: 'rgba(239,105,34,0.1)',
                  }}
                >
                  <i className={`bi ${type.icon}`} style={{ fontSize: '1.75rem', color: 'var(--color-accent)' }}></i>
                </div>
                <h4 className="fw-700 mb-2" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.05rem' }}>
                  {type.title}
                </h4>
                <p className="mb-0" style={{ color: 'var(--color-gray)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
