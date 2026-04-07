import { useScrollReveal } from '../hooks/useScrollReveal';
import { VALUE_PROPS } from '../utils/constants';

export default function ValuePropsSection() {
  const titleRef = useScrollReveal({ threshold: 0.1 });
  const gridRef  = useScrollReveal({ threshold: 0.06 });

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>

      {/* Background decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container position-relative" style={{ zIndex: 1 }}>

        {/* Heading */}
        <div ref={titleRef} className="fade-up text-center mb-5">
          <span className="section-badge mb-3" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            <i className="bi bi-check-circle-fill"></i>
            Why Choose Us
          </span>
          <h2 className="section-title mb-2" style={{ color: '#ffffff' }}>Why Schools Choose Waterlift Solar</h2>
          <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px' }}>
            Everything Your School Needs. Nothing You Don't.
          </p>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Built around the reality of running a Kenyan school — tight budgets, unreliable grid power, and zero tolerance for disruption.
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 stagger-children">
          {VALUE_PROPS.map((vp, i) => (
            <div className="col" key={i}>
              <div
                className="fade-up h-100 p-4 p-lg-5 rounded-brand-lg position-relative"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease, border-color 0.3s ease',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)';
                  e.currentTarget.style.borderColor = 'rgba(239,105,34,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: 'var(--gradient-accent)',
                  borderRadius: '12px 12px 0 0',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                  ref={(el) => {
                    if (!el) return;
                    const parent = el.parentElement;
                    parent.addEventListener('mouseenter', () => el.style.opacity = '1');
                    parent.addEventListener('mouseleave', () => el.style.opacity = '0');
                  }}
                />

                {/* Icon */}
                <div
                  className="icon-box icon-box-md mb-4"
                  style={{ background: 'rgba(239,105,34,0.18)' }}
                >
                  <i className={`bi ${vp.icon}`} style={{ fontSize: '1.55rem', color: 'var(--color-accent)' }}></i>
                </div>

                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                  {vp.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '20px' }}>
                  {vp.description}
                </p>

                {/* Stat callout */}
                <div
                  className="mt-auto p-3 rounded-brand"
                  style={{
                    background: 'rgba(239,105,34,0.12)',
                    borderLeft: '3px solid var(--color-accent)',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-accent)', display: 'block', letterSpacing: '-0.01em' }}>
                    {vp.stat}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{vp.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
