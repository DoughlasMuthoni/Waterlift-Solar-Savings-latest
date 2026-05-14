import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import api from '../utils/api';
import { TRUST_STATS, HOW_IT_WORKS, CONTACT } from '../utils/constants';
import logo from '../assets/logo.jpeg';

/* ─── Form constants (same as ContactSection) ─────────────────────── */
const KENYA_COUNTIES = [
  'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa',
  'Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi',
  'Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos',
  'Makueni','Mandera','Marsabit','Meru','Migori','Mombasa',"Murang'a",
  'Nairobi','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri',
  'Samburu','Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans Nzoia',
  'Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot',
];
const INITIAL = {
  school_name: '', school_type: '', contact_name: '', phone: '',
  email: '', county: '', monthly_bill: '', preferred_plan: '',
};

/* ─── Floating WhatsApp ────────────────────────────────────────────── */
function FloatingWA({ whatsapp }) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{
        position: 'fixed', bottom: 28, right: 24, zIndex: 9999,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        textDecoration: 'none',
        animation: 'lpPulse 2.5s ease-in-out infinite',
      }}
    >
      <i className="bi bi-whatsapp" style={{ fontSize: '1.6rem', color: '#fff' }}></i>
    </a>
  );
}

/* ─── Main inner component (needs SettingsProvider above) ─────────── */
function LandingPageInner() {
  const navigate = useNavigate();
  const liveSettings = useSettings();
  const C = { ...CONTACT, ...liveSettings };

  /* noindex + title */
  useEffect(() => {
    document.title = 'Free School Energy Audit — Waterlift Solar';
    const meta = Object.assign(document.createElement('meta'), {
      name: 'robots', content: 'noindex, nofollow', id: 'lp-noindex',
    });
    document.head.appendChild(meta);
    return () => document.getElementById('lp-noindex')?.remove();
  }, []);

  /* UTM capture */
  const [utmSource, setUtmSource] = useState('');
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const src = ['utm_source', 'utm_medium', 'utm_campaign']
      .map((k) => p.get(k)).filter(Boolean).join(' | ');
    if (src) setUtmSource(src);
  }, []);

  /* Form state */
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.school_name.trim()) e.school_name = 'School name is required';
    if (!form.school_type)        e.school_type = 'Please select a school type';
    if (!form.contact_name.trim()) e.contact_name = 'Your name is required';
    if (!form.phone.trim())       e.phone = 'Phone number is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('loading');
    setServerError('');
    const messageWithUTM = utmSource ? `[Ad Source: ${utmSource}]` : '[Direct / Organic]';
    try {
      await api.post('/api/leads', { ...form, message: messageWithUTM });
      setForm(INITIAL);
      navigate('/thank-you');
    } catch (err) {
      setStatus('error');
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* ── MAIN PAGE ─────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{lpStyles}</style>

      {/* ── STICKY MINI HEADER ─────────────────────────────────── */}
      <header style={stickyHeaderStyle}>
        <div className="container d-flex align-items-center justify-content-between py-2">
          <a href="/">
            <img src={logo} alt="Waterlift Solar" style={{ height: 44, objectFit: 'contain' }} />
          </a>
          <div className="d-flex align-items-center gap-3">
            <a
              href={`tel:${C.phone}`}
              className="d-none d-sm-flex align-items-center gap-2"
              style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
            >
              <i className="bi bi-telephone-fill" style={{ color: 'var(--color-accent)' }}></i>
              {C.phone}
            </a>
            <button
              onClick={scrollToForm}
              className="btn-brand-accent"
              style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap' }}
            >
              Book Free Audit
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO — split layout ─────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #262161 0%, #1a1745 100%)',
          padding: 'clamp(60px, 10vw, 100px) 0 clamp(48px, 8vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle bg texture */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,105,34,0.15) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row g-5 align-items-center">
            {/* LEFT — headline */}
            <div className="col-lg-6 order-2 order-lg-1">
              <span
                className="badge mb-3 px-3 py-2"
                style={{
                  background: 'rgba(239,105,34,0.15)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(239,105,34,0.3)',
                  borderRadius: 50, fontWeight: 600,
                  fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}
              >
                <i className="bi bi-sun-fill me-1"></i>
                1,400+ Kenyan Schools Trust Waterlift Solar
              </span>

              <h1 style={{
                color: '#ffffff', fontWeight: 800,
                fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
                lineHeight: 1.18, marginBottom: 20,
              }}>
                Cut Your School's<br />
                <span style={{ color: 'var(--color-accent)' }}>KPLC Bill by 60%–80%</span>
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
                Zero upfront cost. Free site visit. Savings from Month 1. Used by public and private schools across Kenya since 2018.
              </p>

              {/* Benefit chips */}
              <div className="d-flex flex-column gap-3 mb-4">
                {[
                  { icon: 'bi-cash-stack',       text: 'Zero upfront cost — no deposit, no loan' },
                  { icon: 'bi-calendar-check',    text: 'Free school energy audit — no obligation' },
                  { icon: 'bi-tools',             text: 'All maintenance included forever' },
                  { icon: 'bi-phone',             text: 'M-Pesa monthly payment — simple & automatic' },
                ].map((b) => (
                  <div key={b.text} className="d-flex align-items-center gap-3">
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(239,105,34,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`bi ${b.icon}`} style={{ color: 'var(--color-accent)', fontSize: '1rem' }}></i>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', fontWeight: 500 }}>{b.text}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex align-items-center gap-3 mt-2">
                <a
                  href={`https://wa.me/${C.whatsapp}`}
                  target="_blank" rel="noopener noreferrer"
                  className="d-flex align-items-center gap-2"
                  style={{ color: '#25D366', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                >
                  <i className="bi bi-whatsapp"></i> Chat with us on WhatsApp
                </a>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
                <a href={`tel:${C.phone}`} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', textDecoration: 'none' }}>
                  {C.phone}
                </a>
              </div>
            </div>

            {/* RIGHT — form card */}
            <div className="col-lg-6 order-1 order-lg-2" ref={formRef} id="lp-form">
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 'clamp(24px, 4vw, 40px)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.32)',
                }}
              >
                <div className="mb-4">
                  <h2 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: 'clamp(1.2rem,2.5vw,1.5rem)', marginBottom: 6 }}>
                    Book Your Free School Energy Audit
                  </h2>
                  <p style={{ color: 'var(--color-gray)', fontSize: '0.88rem', marginBottom: 0 }}>
                    We'll call you within 24 hours to schedule a visit. Zero cost, zero obligation.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="alert alert-danger mb-3" role="alert" style={{ fontSize: '0.88rem' }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>{serverError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    {/* School Name */}
                    <div className="col-12">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        School Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text" name="school_name"
                        className={`form-control ${errors.school_name ? 'is-invalid' : ''}`}
                        value={form.school_name} onChange={handleChange}
                        placeholder="e.g. Sunrise Secondary School"
                      />
                      {errors.school_name && <div className="invalid-feedback">{errors.school_name}</div>}
                    </div>

                    {/* School Type */}
                    <div className="col-sm-6">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        School Type <span className="text-danger">*</span>
                      </label>
                      <select
                        name="school_type"
                        className={`form-select ${errors.school_type ? 'is-invalid' : ''}`}
                        value={form.school_type} onChange={handleChange}
                      >
                        <option value="">Select type...</option>
                        <option value="private_day">Private Day School</option>
                        <option value="private_boarding">Private Boarding</option>
                        <option value="public_day">Public Day School</option>
                        <option value="public_boarding">Public Boarding</option>
                      </select>
                      {errors.school_type && <div className="invalid-feedback">{errors.school_type}</div>}
                    </div>

                    {/* County */}
                    <div className="col-sm-6">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        County
                      </label>
                      <select name="county" className="form-select" value={form.county} onChange={handleChange}>
                        <option value="">Select county...</option>
                        {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* Contact Name */}
                    <div className="col-sm-6">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        Your Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text" name="contact_name"
                        className={`form-control ${errors.contact_name ? 'is-invalid' : ''}`}
                        value={form.contact_name} onChange={handleChange}
                        placeholder="e.g. Mrs. Jane Wanjiku"
                      />
                      {errors.contact_name && <div className="invalid-feedback">{errors.contact_name}</div>}
                    </div>

                    {/* Phone */}
                    <div className="col-sm-6">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel" name="phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        value={form.phone} onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    {/* Monthly Bill */}
                    <div className="col-sm-6">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        Monthly KPLC Bill (KES)
                      </label>
                      <input
                        type="number" name="monthly_bill" className="form-control"
                        value={form.monthly_bill} onChange={handleChange}
                        min="0" placeholder="e.g. 85000"
                      />
                    </div>

                    {/* Preferred Plan */}
                    <div className="col-sm-6">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        Preferred Plan
                      </label>
                      <select name="preferred_plan" className="form-select" value={form.preferred_plan} onChange={handleChange}>
                        <option value="">Not Sure Yet</option>
                        <option value="rent_to_own">Rent-to-Own (Own after 36–60 months)</option>
                        <option value="rent_only">Rent-Only (Zero capital)</option>
                      </select>
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                        Email Address <span style={{ color: 'var(--color-gray)', fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        type="email" name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={form.email} onChange={handleChange}
                        placeholder="school@example.co.ke"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Submit */}
                    <div className="col-12 mt-1">
                      <button
                        type="submit"
                        className="btn-brand-accent w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{ padding: '14px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending…</>
                        ) : (
                          <><i className="bi bi-calendar-check"></i> Request My Free School Energy Audit</>
                        )}
                      </button>
                      <p className="text-center mt-2 mb-0" style={{ color: '#9ca3af', fontSize: '0.78rem' }}>
                        <i className="bi bi-lock me-1"></i>
                        100% free &amp; no obligation. By submitting you agree to our{' '}
                        <a href="/privacy-policy" style={{ color: 'var(--color-accent)' }}>Privacy Policy</a>.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '40px 0', borderBottom: '1px solid rgba(38,33,97,0.06)' }}>
        <div className="container">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-6 g-3 text-center">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="col">
                <div style={{ padding: '12px 8px' }}>
                  <div style={{ fontWeight: 800, fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: 'var(--color-primary)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'var(--color-gray)', fontSize: '0.75rem', marginTop: 6, lineHeight: 1.3 }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'clamp(56px, 8vw, 80px) 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span
              className="badge mb-3 px-3 py-2"
              style={{
                background: 'rgba(239,105,34,0.1)', color: 'var(--color-accent)',
                border: '1px solid rgba(239,105,34,0.25)',
                borderRadius: 50, fontWeight: 600, fontSize: '0.78rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}
            >
              <i className="bi bi-list-ol me-1"></i>The Process
            </span>
            <h2 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              From Enquiry to Savings in 4 Simple Steps
            </h2>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="col">
                <div style={{ padding: '8px 0' }}>
                  <div
                    style={{
                      width: 56, height: 56, borderRadius: 16, marginBottom: 16,
                      background: i === 0 ? 'var(--color-primary)' : 'rgba(38,33,97,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <i className={`bi ${step.icon}`} style={{ fontSize: '1.4rem', color: i === 0 ? '#fff' : 'var(--color-primary)' }}></i>
                  </div>
                  <div style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {step.step}
                  </div>
                  <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
                    {step.title}
                  </h4>
                  <p style={{ color: 'var(--color-gray)', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: 0 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM URGENCY CTA ────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #262161 0%, #1a1745 100%)', padding: 'clamp(48px, 7vw, 72px) 0' }}>
        <div className="container text-center">
          <h2 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>
            Thousands of Kenyan Schools Are Already Saving.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Join 1,400+ schools cutting electricity costs by 60%–80%. Book your free audit today — no commitment required.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button
              onClick={scrollToForm}
              className="btn-brand-accent"
              style={{ padding: '14px 28px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}
            >
              <i className="bi bi-calendar-check me-2"></i>Book My Free Audit
            </button>
            <a
              href={`https://wa.me/${C.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="d-flex align-items-center gap-2"
              style={{
                padding: '14px 28px', borderRadius: '10px',
                background: '#25D366', color: '#fff',
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              }}
            >
              <i className="bi bi-whatsapp"></i> WhatsApp Us
            </a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: 20 }}>
            <i className="bi bi-shield-check me-1"></i>
            EPRA Licensed · All Maintenance Included · M-Pesa Monthly Payments
          </p>
        </div>
      </section>

      {/* ── MINI FOOTER ───────────────────────────────────────────── */}
      <MiniFooter />

      {/* ── FLOATING WHATSAPP ─────────────────────────────────────── */}
      <FloatingWA whatsapp={C.whatsapp} />
    </div>
  );
}

/* ─── Mini footer (shared between states) ─────────────────────────── */
function MiniFooter() {
  return (
    <footer style={{ background: 'var(--color-primary)', padding: '28px 0' }}>
      <div className="container">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginBottom: 4 }}>
              Waterlift Solar Savings is a specialized service of <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Waterlift Solar Limited</strong>. Registered in Kenya.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginBottom: 0 }}>
              © {new Date().getFullYear()} Waterlift Solar Limited. All Rights Reserved.
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex gap-3 justify-content-center justify-content-md-end flex-wrap">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Main Website', href: '/' },
            ].map((l) => (
              <a
                key={l.label} href={l.href}
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Sticky header style ──────────────────────────────────────────── */
const stickyHeaderStyle = {
  position: 'sticky', top: 0, zIndex: 1000,
  background: '#ffffff',
  borderBottom: '1px solid rgba(38,33,97,0.08)',
  boxShadow: '0 2px 12px rgba(38,33,97,0.06)',
};

/* ─── Page-scoped styles (pulse animation) ─────────────────────────── */
const lpStyles = `
  @keyframes lpPulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.4); }
    50%       { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 14px rgba(37,211,102,0); }
  }
`;

/* ─── Export wrapped in SettingsProvider ───────────────────────────── */
export default function CampaignLandingPage() {
  return (
    <SettingsProvider>
      <LandingPageInner />
    </SettingsProvider>
  );
}
