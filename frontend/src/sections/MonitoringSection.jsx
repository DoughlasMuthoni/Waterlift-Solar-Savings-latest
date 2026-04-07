import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const MONITORING_FEATURES = [
  { icon: 'bi-sun', title: 'Real-Time Solar Output', description: 'Track how much power your panels are generating at any moment.' },
  { icon: 'bi-piggy-bank', title: 'Live Savings Tracker', description: 'See exactly how much you have saved vs. your old KPLC bills each month.' },
  { icon: 'bi-bell', title: 'System Health Alerts', description: 'Get instant notifications if any component needs attention.' },
  { icon: 'bi-droplet-half', title: 'Water System Status', description: 'Monitor pump activity, tank levels, and borehole performance in one place.' },
];

const STATS = [
  { label: 'Solar Output Today', target: 87, unit: '%', color: '#EF6922', barColor: 'var(--color-accent)' },
  { label: 'Battery Level', target: 92, unit: '%', color: '#4ade80', barColor: '#4ade80' },
  { label: 'Monthly Savings', target: 62400, unit: 'KES', color: '#60a5fa', barColor: '#60a5fa', isCurrency: true },
];

function useCountUp(target, duration = 1800, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return value;
}

function AnimatedBar({ stat, active, index }) {
  const val = useCountUp(stat.target, 1600 + index * 200, active);
  const barPct = stat.isCurrency ? Math.round((val / stat.target) * 78) : val;

  const displayValue = stat.isCurrency
    ? `KES ${val.toLocaleString()}`
    : `${val}${stat.unit}`;

  return (
    <div className="w-100 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.82rem', letterSpacing: '0.02em' }}>
          {stat.label}
        </span>
        <span
          style={{
            color: stat.color,
            fontWeight: 800,
            fontSize: '0.95rem',
            fontVariantNumeric: 'tabular-nums',
            minWidth: '90px',
            textAlign: 'right',
            transition: 'color 0.3s ease',
          }}
        >
          {displayValue}
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: '8px',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${barPct}%`,
            borderRadius: '4px',
            background: `linear-gradient(90deg, ${stat.barColor}88, ${stat.barColor})`,
            transition: 'width 0.05s linear',
            boxShadow: `0 0 8px ${stat.barColor}66`,
            position: 'relative',
          }}
        >
          {/* Shimmer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              animation: active ? 'barShimmer 2s ease-in-out infinite' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LiveDot({ color }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        marginRight: 6,
        animation: 'livePulse 1.8s ease-in-out infinite',
        boxShadow: `0 0 0 0 ${color}`,
      }}
    />
  );
}

export default function MonitoringSection() {
  const textRef = useScrollReveal();
  const dashRef = useRef(null);
  const [dashVisible, setDashVisible] = useState(false);

  useEffect(() => {
    const el = dashRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDashVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="monitoring" className="section-py">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Text */}
          <div className="col-lg-6 order-2 order-lg-1">
            <div ref={textRef} className="fade-up">
              <span
                className="badge mb-4 px-3 py-2"
                style={{
                  background: 'rgba(38,33,97,0.08)',
                  color: 'var(--color-primary)',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <i className="bi bi-activity me-1"></i>
                After-Installation Value
              </span>
              <h2 className="section-title mb-3">Monitor Your Savings in Real Time</h2>
              <div className="divider-accent-left mb-4"></div>
              <p className="mb-5" style={{ color: 'var(--color-gray)', fontSize: '1rem', lineHeight: 1.75 }}>
                Every Waterlift system includes remote monitoring. Track solar output, water supply, battery health, and cumulative savings — all from your phone or computer.
              </p>

              <div className="d-flex flex-column gap-4">
                {MONITORING_FEATURES.map((f, i) => (
                  <div key={i} className="d-flex gap-3 align-items-start">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(38,33,97,0.06)' }}
                    >
                      <i className={`bi ${f.icon}`} style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}></i>
                    </div>
                    <div>
                      <h5 className="fw-700 mb-1" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{f.title}</h5>
                      <p className="mb-0" style={{ color: 'var(--color-gray)', fontSize: '0.88rem', lineHeight: 1.6 }}>{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Dashboard */}
          <div className="col-lg-6 order-1 order-lg-2">
            <div
              ref={dashRef}
              className="rounded-brand"
              style={{
                background: 'linear-gradient(145deg, #1a1745 0%, #262161 50%, #1a1745 100%)',
                minHeight: 400,
                padding: '36px 32px',
                boxShadow: '0 20px 60px rgba(38,33,97,0.35), 0 4px 20px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: dashVisible ? 1 : 0,
                transform: dashVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              {/* Dashboard header */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-speedometer2" style={{ fontSize: '1.4rem', color: 'var(--color-accent)' }}></i>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.1 }}>System Dashboard</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>Waterlift Solar Monitor</div>
                  </div>
                </div>
                <div
                  style={{
                    background: 'rgba(74,222,128,0.12)',
                    border: '1px solid rgba(74,222,128,0.3)',
                    borderRadius: '50px',
                    padding: '4px 12px',
                    fontSize: '0.72rem',
                    color: '#4ade80',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LiveDot color="#4ade80" />
                  LIVE
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />

              {/* Animated stat bars */}
              {STATS.map((stat, i) => (
                <AnimatedBar key={stat.label} stat={stat} active={dashVisible} index={i} />
              ))}

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0 20px' }} />

              {/* Footer row */}
              <div className="d-flex align-items-center justify-content-between">
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                  <i className="bi bi-clock me-1"></i>
                  Updated just now
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                  <i className="bi bi-geo-alt me-1"></i>
                  Nairobi, Kenya
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes barShimmer {
          0% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(200%); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}
