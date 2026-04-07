import { TRUST_STATS } from '../utils/constants';

const ICONS = [
  'bi-lightning-charge-fill',
  'bi-building-check',
  'bi-geo-alt-fill',
  'bi-mortarboard-fill',
  'bi-moon-stars-fill',
  'bi-award-fill',
];

export default function TrustBar() {
  return (
    <section
      id="trust"
      style={{
        background: 'var(--gradient-primary)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Subtle dot overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          pointerEvents: 'none',
        }}
      />

      {/* Accent glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40px', right: '-60px',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,105,34,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-6 g-0">
          {TRUST_STATS.map((stat, i) => (
            <div
              key={i}
              className="col text-center position-relative"
              style={{
                padding: '28px 12px',
                borderRight: i < TRUST_STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              {/* Icon */}
              <div
                className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  background: 'rgba(239,105,34,0.18)',
                  border: '1px solid rgba(239,105,34,0.3)',
                  marginBottom: '10px',
                }}
              >
                <i
                  className={`bi ${ICONS[i]}`}
                  style={{ fontSize: '1rem', color: 'var(--color-accent)' }}
                ></i>
              </div>

              {/* Value */}
              <div
                style={{
                  fontSize: 'clamp(1.2rem, 2.8vw, 1.65rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '5px',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.55)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  lineHeight: 1.35,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
