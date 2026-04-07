import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PLANS } from '../utils/constants';
import api from '../utils/api';

function PlanCard({ plan, index }) {
  const ref = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`fade-up h-100 p-4 p-lg-5 rounded-brand position-relative${plan.popular ? ' card-popular' : ''}`}
      style={{
        background: plan.popular
          ? 'linear-gradient(160deg, var(--color-primary) 0%, #1a1745 100%)'
          : '#fff',
        border: plan.popular ? '2px solid var(--color-accent)' : '1px solid #e5e7eb',
        boxShadow: plan.popular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transitionDelay: `${index * 120}ms`,
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      <div className="mb-4">
        <span
          className="badge px-3 py-2"
          style={{
            backgroundColor: plan.popular ? 'var(--color-accent)' : 'rgba(38,33,97,0.08)',
            color: plan.popular ? 'var(--color-primary)' : 'var(--color-primary)',
            borderRadius: '50px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {plan.badge}
        </span>
      </div>

      {/* Plan name */}
      <h3
        style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: plan.popular ? '#fff' : 'var(--color-primary)',
          marginBottom: '8px',
          lineHeight: 1.1,
        }}
      >
        {plan.name}
      </h3>

      <p
        style={{
          color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--color-gray)',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          marginBottom: '28px',
          minHeight: '48px',
        }}
      >
        {plan.tagline}
      </p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: plan.popular ? 'rgba(255,255,255,0.15)' : 'rgba(38,33,97,0.08)',
          marginBottom: '24px',
        }}
      />

      {/* Features */}
      <ul className="list-unstyled mb-4">
        {plan.features.map((feat, i) => (
          <li key={i} className="d-flex align-items-start gap-3 mb-3">
            <i
              className="bi bi-check-circle-fill flex-shrink-0 mt-1"
              style={{
                fontSize: '0.95rem',
                color: plan.popular ? 'var(--color-accent)' : 'var(--color-primary)',
              }}
            ></i>
            <span
              style={{
                color: plan.popular ? 'rgba(255,255,255,0.85)' : '#374151',
                fontSize: '0.9rem',
                lineHeight: 1.55,
              }}
            >
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* Plan note */}
      <p
        style={{
          color: plan.popular ? 'rgba(255,255,255,0.45)' : 'var(--color-gray)',
          fontSize: '0.78rem',
          marginBottom: '24px',
        }}
      >
        <i className="bi bi-info-circle me-1"></i>
        {plan.note}
      </p>

      {/* CTA */}
      <a
        href="#contact"
        className={`text-decoration-none d-flex align-items-center justify-content-center gap-2 fw-700 py-3 rounded-brand`}
        style={{
          background: plan.popular ? 'var(--color-accent)' : 'var(--color-primary)',
          color: plan.popular ? 'var(--color-primary)' : '#fff',
          fontWeight: 700,
          fontSize: '0.95rem',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <i className="bi bi-calendar-check"></i>
        Request a Quote
      </a>
    </div>
  );
}

export default function PlansSection() {
  const titleRef = useScrollReveal();
  const [plans, setPlans] = useState(PLANS);

  useEffect(() => {
    api.get('/api/packages')
      .then((res) => {
        const data = res.data?.data;
        if (Array.isArray(data) && data.length > 0) setPlans(data);
      })
      .catch(() => {/* keep PLANS fallback */});
  }, []);

  return (
    <section id="plans" className="section-py" style={{ backgroundColor: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div ref={titleRef} className="fade-up text-center mb-5">
          <span
            className="badge mb-3 px-3 py-2"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <i className="bi bi-list-check me-1"></i>
            Our Plans
          </span>
          <h2 className="section-title mb-3" style={{ color: '#ffffff' }}>Two Plans Built for Schools</h2>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Both plans deliver the same savings with zero upfront cost. The difference is ownership
            and long-term commitment. Choose what works best for your school's financial strategy.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
          {plans.map((plan, i) => (
            <div className="col col-lg-5" key={plan.id}>
              <PlanCard plan={plan} index={i} />
            </div>
          ))}
        </div>

        {/* Savings guarantee banner */}
        <div className="text-center mt-5">
          <div
            className="d-inline-flex align-items-center gap-3 px-4 py-3 rounded-brand"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <i className="bi bi-shield-check" style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}></i>
            <div className="text-start">
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                Savings Guarantee Included
              </div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>
                If your system underperforms, we fix it at zero cost — guaranteed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
