import { useScrollReveal } from '../hooks/useScrollReveal';
import { VALUE_PROPS } from '../utils/constants';

const CARD_TOP_BARS = [
  'linear-gradient(90deg, #262161 0%, #3730a3 100%)',
  'linear-gradient(90deg, #EF6922 0%, #f5883f 100%)',
  'linear-gradient(90deg, #262161 0%, #EF6922 100%)',
  'linear-gradient(90deg, #EF6922 0%, #262161 100%)',
  'linear-gradient(90deg, #3730a3 0%, #EF6922 100%)',
  'linear-gradient(90deg, #f5883f 0%, #262161 100%)',
];

const ICON_STYLES = [
  { bg: 'rgba(38,33,97,0.09)',   border: '1.5px solid rgba(38,33,97,0.18)',   color: '#262161' },
  { bg: 'rgba(239,105,34,0.10)', border: '1.5px solid rgba(239,105,34,0.22)', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.09)',   border: '1.5px solid rgba(38,33,97,0.18)',   color: '#262161' },
  { bg: 'rgba(239,105,34,0.10)', border: '1.5px solid rgba(239,105,34,0.22)', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.09)',   border: '1.5px solid rgba(38,33,97,0.18)',   color: '#262161' },
  { bg: 'rgba(239,105,34,0.10)', border: '1.5px solid rgba(239,105,34,0.22)', color: '#EF6922' },
];

const STAT_STYLES = [
  { bg: 'rgba(239,105,34,0.07)', borderColor: '#EF6922', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.06)',   borderColor: '#262161', color: '#262161' },
  { bg: 'rgba(239,105,34,0.07)', borderColor: '#EF6922', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.06)',   borderColor: '#262161', color: '#262161' },
  { bg: 'rgba(239,105,34,0.07)', borderColor: '#EF6922', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.06)',   borderColor: '#262161', color: '#262161' },
];

export default function ValuePropsSection() {
  const titleRef = useScrollReveal({ threshold: 0.1 });
  const gridRef  = useScrollReveal({ threshold: 0.06 });

  return (
    <section
      className="section-py"
      style={{
        background: 'linear-gradient(145deg, #f8f9ff 0%, #eef0fa 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,105,34,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(38,33,97,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container position-relative" style={{ zIndex: 1 }}>

        {/* Heading */}
        <div ref={titleRef} className="fade-up text-center mb-5">
          <span
            className="section-badge mb-3"
            style={{
              background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #262161, #EF6922) border-box',
              border: '1.5px solid transparent',
              color: 'var(--color-primary)',
            }}
          >
            <i className="bi bi-check-circle-fill" style={{ color: 'var(--color-accent)' }}></i>
            Why Choose Us
          </span>
          <h2 className="section-title mb-2">Why Schools Choose Waterlift Solar</h2>
          <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px' }}>
            Everything Your School Needs. Nothing You Don't.
          </p>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3">
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
                  background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #262161, #EF6922) border-box',
                  border: '1.5px solid transparent',
                  boxShadow: '0 4px 18px rgba(38,33,97,0.07), 0 1px 4px rgba(38,33,97,0.04)',
                  transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s ease',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 52px rgba(38,33,97,0.13), 0 4px 12px rgba(239,105,34,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(38,33,97,0.07), 0 1px 4px rgba(38,33,97,0.04)';
                }}
              >
                {/* Top colour bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '4px',
                  background: CARD_TOP_BARS[i % CARD_TOP_BARS.length],
                  borderRadius: '12px 12px 0 0',
                }} />

                {/* Icon */}
                <div
                  className="icon-box icon-box-md mb-4"
                  style={{
                    background: ICON_STYLES[i % ICON_STYLES.length].bg,
                    border: ICON_STYLES[i % ICON_STYLES.length].border,
                  }}
                >
                  <i
                    className={`bi ${vp.icon}`}
                    style={{ fontSize: '1.55rem', color: ICON_STYLES[i % ICON_STYLES.length].color }}
                  />
                </div>

                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                  {vp.title}
                </h3>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '20px' }}>
                  {vp.description}
                </p>

                {/* Stat callout — alternates blue / orange */}
                <div
                  className="mt-auto p-3 rounded-brand"
                  style={{
                    background: STAT_STYLES[i % STAT_STYLES.length].bg,
                    borderLeft: `3px solid ${STAT_STYLES[i % STAT_STYLES.length].borderColor}`,
                  }}
                >
                  <span style={{
                    fontSize: '1.1rem', fontWeight: 800, display: 'block', letterSpacing: '-0.01em',
                    color: STAT_STYLES[i % STAT_STYLES.length].color,
                  }}>
                    {vp.stat}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-gray)', fontWeight: 500 }}>
                    {vp.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
