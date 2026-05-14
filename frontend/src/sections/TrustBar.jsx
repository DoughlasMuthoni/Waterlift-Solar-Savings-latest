import { TRUST_STATS } from '../utils/constants';

const ICONS = [
  'bi-lightning-charge-fill',
  'bi-building-check',
  'bi-geo-alt-fill',
  'bi-mortarboard-fill',
  'bi-moon-stars-fill',
  'bi-award-fill',
];

const TOP_BARS = [
  'linear-gradient(90deg, #262161 0%, #3730a3 100%)',
  'linear-gradient(90deg, #EF6922 0%, #f5883f 100%)',
  'linear-gradient(90deg, #262161 0%, #EF6922 100%)',
  'linear-gradient(90deg, #EF6922 0%, #262161 100%)',
  'linear-gradient(90deg, #3730a3 0%, #262161 100%)',
  'linear-gradient(90deg, #f5883f 0%, #EF6922 100%)',
];

const ICON_STYLES = [
  { bg: 'rgba(38,33,97,0.09)',  border: 'rgba(38,33,97,0.18)',   color: '#262161' },
  { bg: 'rgba(239,105,34,0.10)', border: 'rgba(239,105,34,0.22)', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.09)',  border: 'rgba(38,33,97,0.18)',   color: '#262161' },
  { bg: 'rgba(239,105,34,0.10)', border: 'rgba(239,105,34,0.22)', color: '#EF6922' },
  { bg: 'rgba(38,33,97,0.09)',  border: 'rgba(38,33,97,0.18)',   color: '#262161' },
  { bg: 'rgba(239,105,34,0.10)', border: 'rgba(239,105,34,0.22)', color: '#EF6922' },
];

export default function TrustBar() {
  return (
    <section
      id="trust"
      style={{
        background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 55%, #fff8f5 100%)',
        padding: '56px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,105,34,0.09) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(38,33,97,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container position-relative" style={{ zIndex: 1 }}>

        {/* Label */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-gray)',
          marginBottom: '32px',
        }}>
          Trusted by Schools Across Kenya
        </p>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-6 g-3 align-items-stretch">
          {TRUST_STATS.map((stat, i) => (
            <div className="col d-flex" key={i}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #262161, #EF6922) border-box',
                  border: '1.5px solid transparent',
                  borderRadius: '16px',
                  padding: '26px 14px 22px',
                  textAlign: 'center',
                  boxShadow: '0 4px 18px rgba(38,33,97,0.08), 0 1px 4px rgba(38,33,97,0.04)',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-7px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(38,33,97,0.13), 0 4px 12px rgba(239,105,34,0.10)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(38,33,97,0.08), 0 1px 4px rgba(38,33,97,0.04)';
                }}
              >
                {/* Top colour bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '4px',
                  background: TOP_BARS[i],
                  borderRadius: '16px 16px 0 0',
                }} />

                {/* Icon */}
                <div style={{
                  width: 44, height: 44,
                  borderRadius: '12px',
                  background: ICON_STYLES[i].bg,
                  border: `1.5px solid ${ICON_STYLES[i].border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                }}>
                  <i
                    className={`bi ${ICONS[i]}`}
                    style={{ fontSize: '1.1rem', color: ICON_STYLES[i].color }}
                  />
                </div>

                {/* Value */}
                <div style={{
                  fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                  letterSpacing: '-0.02em',
                }}>
                  {stat.value}
                </div>

                {/* Label */}
                <div style={{
                  fontSize: '0.67rem',
                  color: 'var(--color-gray)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: 1.45,
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
