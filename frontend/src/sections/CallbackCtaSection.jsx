import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSettings } from '../context/SettingsContext';

export default function CallbackCtaSection() {
  const ref = useScrollReveal();
  const { whatsapp } = useSettings();

  return (
    <section id="callback-cta" className="section-py-sm" style={{ background: 'var(--color-accent)' }}>
      <div className="container">
        <div ref={ref} className="fade-up text-center">
          <h2
            className="fw-800 mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.2 }}
          >
            Not Sure Which System Is Right for Your School?
          </h2>
          <p
            className="mb-5 mx-auto"
            style={{ fontSize: '1.05rem', color: 'rgba(38,33,97,0.75)', maxWidth: 560 }}
          >
            Our engineers assess your school for free — no obligation, no pushy sales. Just an honest recommendation.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a
              href="#contact"
              className="btn-brand-primary text-decoration-none d-inline-flex align-items-center gap-2"
              style={{ padding: '14px 32px', borderRadius: '10px', fontSize: '1rem' }}
            >
              <i className="bi bi-calendar-check"></i>
              Request Free Site Audit
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 fw-700 text-decoration-none"
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '1rem',
                background: '#fff',
                color: 'var(--color-primary)',
                fontWeight: 700,
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
            >
              <i className="bi bi-whatsapp" style={{ color: '#25D366', fontSize: '1.1rem' }}></i>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
