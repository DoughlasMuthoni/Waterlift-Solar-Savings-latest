import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FALLBACK_FAQS } from '../utils/constants';
import { useSettings } from '../context/SettingsContext';
import api from '../utils/api';

export default function FaqSection() {
  const titleRef = useScrollReveal();
  const accordionRef = useScrollReveal();
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const { whatsapp } = useSettings();
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    api.get('/api/faqs')
      .then((res) => {
        const data = res.data?.data;
        if (Array.isArray(data) && data.length > 0) setFaqs(data);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="faqs" className="section-py" style={{ backgroundColor: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
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
            <i className="bi bi-patch-question me-1"></i>
            FAQ
          </span>
          <h2 className="section-title mb-3" style={{ color: '#ffffff' }}>Questions from School Leaders</h2>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Every principal, director, and board member asks these questions. Here are the honest, complete answers you need before making a decision.
          </p>
        </div>

        <div ref={accordionRef} className="fade-up row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, i) => {
                const id = faq.id || i;
                const isOpen = openId === id;
                return (
                  <div
                    key={id}
                    className="accordion-item mb-3"
                    style={{
                      border: isOpen ? '1.5px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 'var(--border-radius)',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(8px)',
                      transition: 'border-color 0.25s ease',
                    }}
                  >
                    <h3 className="accordion-header mb-0">
                      <button
                        className={`accordion-button ${isOpen ? '' : 'collapsed'} py-4`}
                        type="button"
                        onClick={() => toggle(id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-body-${id}`}
                        style={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: isOpen ? 'var(--color-accent)' : 'rgba(255,255,255,0.9)',
                          background: 'transparent',
                          boxShadow: 'none',
                        }}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`faq-body-${id}`}
                      className={`accordion-collapse ${isOpen ? 'show' : 'collapse'}`}
                      role="region"
                      aria-labelledby={`faq-header-${id}`}
                    >
                      <div
                        className="accordion-body pt-0 pb-4"
                        style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75, background: 'transparent' }}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-4">
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                Still have questions?{' '}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ffffff', fontWeight: 700 }}
                >
                  <i className="bi bi-whatsapp me-1" style={{ color: '#25D366' }}></i>
                  Chat with us on WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
