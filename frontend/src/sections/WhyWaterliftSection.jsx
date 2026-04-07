import { useScrollReveal } from '../hooks/useScrollReveal';
import { WHY_WATERLIFT } from '../utils/constants';

export default function WhyWaterliftSection() {
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="why-waterlift" className="section-py" style={{ background: 'var(--color-primary)' }}>
      <div className="container">
        <div ref={titleRef} className="fade-up text-center mb-5">
          <h2 className="mb-3" style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
            Not Just Solar. Solar Built for Schools.
          </h2>
          <div className="divider-accent" style={{ background: 'var(--color-accent)' }}></div>
          <p className="mt-3 mx-auto" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 640 }}>
            Any solar company can put panels on a roof. Only Waterlift Solar has spent years building the systems, teams, and experience to serve Kenyan schools specifically.
          </p>
        </div>

        <div ref={gridRef} className="row row-cols-1 row-cols-sm-2 g-4 stagger-children">
          {WHY_WATERLIFT.map((item, i) => (
            <div className="col" key={i}>
              <div
                className="fade-up d-flex gap-4 p-4 rounded-brand h-100"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(243,163,120,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(243,163,120,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                <div
                  className="flex-shrink-0 d-flex align-items-center justify-content-center"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '14px',
                    background: 'rgba(243,163,120,0.15)',
                  }}
                >
                  <i className={`bi ${item.icon}`} style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}></i>
                </div>
                <div>
                  <h4 className="fw-700 mb-2 text-white" style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    {item.title}
                  </h4>
                  <p className="mb-0" style={{ color: 'rgba(255,255,255,0.68)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a
            href="#contact"
            className="btn-brand-accent text-decoration-none d-inline-flex align-items-center gap-2"
            style={{ padding: '14px 36px', borderRadius: '10px', fontSize: '1rem' }}
          >
            <i className="bi bi-calendar-check"></i>
            Request Your Free Site Audit
          </a>
        </div>
      </div>
    </section>
  );
}
