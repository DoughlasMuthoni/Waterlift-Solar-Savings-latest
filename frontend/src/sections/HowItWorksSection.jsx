import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS = [
  {
    step: 'Step 01',
    icon: 'bi-clipboard2-check',
    title: 'Free Audit & Custom Design',
    description:
      'Our specialist visits your campus, assesses your load profile, analyses 12 months of KPLC bills, then designs a solar system sized precisely for your school — classrooms, labs, kitchen, dormitories, borehole pumps, and admin block.',
    accent: false,
  },
  {
    step: 'Step 02',
    icon: 'bi-credit-card-2-front',
    title: 'Flexible Finance Plan',
    description:
      'Choose Rent-to-Own or Rent-Only. Zero upfront cost — your school pays nothing to start. Your fixed monthly payment is lower than your current KPLC bill, settled simply via M-Pesa on the 1st of each month.',
    accent: true, // finance card highlighted
  },
  {
    step: 'Step 03',
    icon: 'bi-wrench-adjustable',
    title: 'Professional Installation',
    description:
      'EPRA-licensed installation completed in 5–10 working days. All work is scheduled during school holidays or weekends — zero disruption to lessons, exams, or boarding operations.',
    accent: false,
  },
  {
    step: 'Step 04',
    icon: 'bi-graph-up',
    title: 'Savings from Day One',
    description:
      'Your system goes live and your KPLC bill collapses immediately. Access your live monitoring dashboard, pay monthly via M-Pesa, and watch savings accumulate every month.',
    accent: false,
  },
];

export default function HowItWorksSection() {
  const headingRef = useScrollReveal({ threshold: 0.1 });
  const gridRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className="section-py" id="how-it-works" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="container">
        {/* Heading */}
        <div ref={headingRef} className="fade-up text-center mb-5">
          <span
            className="badge mb-3 px-3 py-2"
            style={{
              background: 'rgba(38,33,97,0.07)',
              color: 'var(--color-primary)',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <i className="bi bi-arrow-right-circle me-1"></i>
            Our Process
          </span>
          <h2 className="section-title">From Audit to Savings in 4 Simple Steps</h2>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3">
            We make it effortless. You focus on running your school. We handle everything from assessment to installation to ongoing operations.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={gridRef}
          className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 stagger-children position-relative"
        >
          {/* Desktop connecting line */}
          <div
            className="d-none d-lg-block"
            style={{
              position: 'absolute',
              top: '58px',
              left: '16%',
              right: '16%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary) 100%)',
              opacity: 0.2,
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => (
            <div className="col fade-up" key={i}>
              <div
                className="h-100 p-4 rounded-brand text-center position-relative"
                style={{
                  backgroundColor: step.accent ? 'var(--color-primary)' : '#fff',
                  border: step.accent ? '2px solid var(--color-accent)' : '1.5px solid rgba(38,33,97,0.07)',
                  boxShadow: step.accent ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  zIndex: 1,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = step.accent ? 'var(--shadow-lg)' : 'var(--shadow-sm)';
                }}
              >
                {/* Finance badge */}
                {step.accent && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--color-accent)',
                      color: 'var(--color-primary)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '3px 12px',
                      borderRadius: '50px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Zero Upfront Cost
                  </div>
                )}

                {/* Step number circle */}
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: step.accent
                      ? 'rgba(243,163,120,0.2)'
                      : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                    border: step.accent ? '2px solid rgba(243,163,120,0.4)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: step.accent ? 'var(--color-accent)' : 'var(--color-accent)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-3">
                  <i
                    className={`bi ${step.icon}`}
                    style={{
                      fontSize: '1.8rem',
                      color: step.accent ? 'var(--color-accent)' : 'var(--color-accent)',
                    }}
                  ></i>
                </div>

                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: step.accent ? '#fff' : 'var(--color-primary)',
                    marginBottom: '10px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: step.accent ? 'rgba(255,255,255,0.72)' : 'var(--color-gray)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>

                {/* Arrow connector */}
                {i < STEPS.length - 1 && (
                  <div
                    className="d-none d-lg-block"
                    style={{
                      position: 'absolute',
                      right: '-22px',
                      top: '54px',
                      zIndex: 2,
                      color: 'var(--color-accent)',
                      fontSize: '1.2rem',
                    }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <a
            href="#contact"
            className="btn-brand-primary text-decoration-none d-inline-flex align-items-center gap-2"
            style={{ padding: '13px 30px', borderRadius: '9px', fontSize: '0.95rem' }}
          >
            <i className="bi bi-calendar-check"></i>
            Book Your Free Site Audit
          </a>
        </div>
      </div>
    </section>
  );
}
