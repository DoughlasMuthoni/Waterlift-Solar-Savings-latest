import { useScrollReveal } from '../hooks/useScrollReveal';
import solarImg from '../assets/picture/solarpanels.png';
import { PROBLEM_POINTS } from '../utils/constants';

export default function ProblemSection() {
  const imageRef = useScrollReveal({ threshold: 0.1 });
  const textRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Left — image with stats overlay */}
          <div className="col-lg-5 order-2 order-lg-1">
            <div ref={imageRef} className="slide-in-left position-relative rounded-brand overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <img
                src={solarImg}
                alt="Solar panels on a Kenyan school rooftop"
                loading="lazy"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(160deg, rgba(38,33,97,0.55) 0%, rgba(15,14,46,0.72) 100%)',
                }}
              />
              {/* Stats chips */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 20,
                  right: 20,
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { value: 'KES 90K', label: 'Avg Monthly Bill' },
                  { value: '12 hrs', label: 'Weekly Outage' },
                  { value: '3×', label: 'Diesel Cost/kWh' },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      flex: 1,
                      minWidth: '90px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '1.2rem', lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', marginTop: 4, lineHeight: 1.2 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className="col-lg-7 order-1 order-lg-2">
            <div ref={textRef} className="fade-up">
              <span
                className="badge mb-3 px-3 py-2"
                style={{
                  background: 'rgba(243,163,120,0.12)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(243,163,120,0.3)',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <i className="bi bi-exclamation-triangle me-1"></i>
                The Problem
              </span>

              <h2 className="section-title mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                Your School Deserves Better Than{' '}
                <span style={{ color: 'var(--color-accent)' }}>KPLC Bills and Diesel Fumes</span>
              </h2>

              <p className="mb-4" style={{ color: 'var(--color-gray)', fontSize: '0.98rem', lineHeight: 1.75 }}>
                Kenyan school leaders face an energy crisis that drains budgets, disrupts education, and holds institutions back. You know it. We solve it.
              </p>

              {/* 6 problems in 2 columns */}
              <div className="row row-cols-1 row-cols-sm-2 g-3">
                {PROBLEM_POINTS.map((pt, i) => (
                  <div className="col" key={i}>
                    <div
                      className="d-flex gap-3 p-3 rounded-brand"
                      style={{
                        background: '#fff',
                        border: '1px solid rgba(38,33,97,0.08)',
                        boxShadow: 'var(--shadow-sm)',
                        height: '100%',
                      }}
                    >
                      <div
                        className="flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '10px',
                          background: 'rgba(243,163,120,0.12)',
                          marginTop: 2,
                        }}
                      >
                        <i className={`bi ${pt.icon}`} style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.85rem', lineHeight: 1.3, marginBottom: 4 }}>
                          {pt.title}
                        </div>
                        <div style={{ color: 'var(--color-gray)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                          {pt.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <a
                  href="#how-it-works"
                  className="btn-brand-accent text-decoration-none d-inline-flex align-items-center gap-2"
                  style={{ padding: '13px 28px', borderRadius: '9px', fontSize: '0.95rem' }}
                >
                  See Our Solution <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
