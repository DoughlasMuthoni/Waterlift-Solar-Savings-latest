import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import api from '../utils/api';
import { CONTACT } from '../utils/constants';
import { useSettings } from '../context/SettingsContext';

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
  school_name: '', school_type: '', contact_name: '', phone: '', email: '',
  county: '', num_students: '', monthly_bill: '', preferred_plan: '', message: '',
};

export default function ContactSection() {
  const titleRef = useScrollReveal();
  const navigate = useNavigate();
  const liveSettings = useSettings();
  const C = { ...CONTACT, ...liveSettings };
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.school_name.trim()) e.school_name = 'School name is required';
    if (!form.school_type) e.school_type = 'Please select a school type';
    if (!form.contact_name.trim()) e.contact_name = 'Contact name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('loading');
    setServerError('');
    try {
      await api.post('/api/leads', form);
      setForm(INITIAL);
      navigate('/thank-you');
    } catch (err) {
      setStatus('error');
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="section-py bg-light-brand">
      <div className="container">
        <div ref={titleRef} className="fade-up text-center mb-5">
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
            <i className="bi bi-calendar-check me-1"></i>
            Free Audit
          </span>
          <h2 className="section-title mb-3">Get Your Free School Energy Audit</h2>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3">
            A Waterlift Solar school energy specialist will contact you within 24 hours to schedule a visit,
            assess your campus, and provide a detailed savings projection — at no cost and with no obligation.
          </p>
        </div>

        <div className="row g-5">
          {/* Form */}
          <div className="col-lg-8">
            <div className="rounded-brand p-4 p-lg-5" style={{ background: '#fff', boxShadow: 'var(--shadow-md)' }}>
              {status === 'error' && (
                <div className="alert alert-danger mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-4">
                  {/* School Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>
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
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>
                      School Type <span className="text-danger">*</span>
                    </label>
                    <select name="school_type"
                      className={`form-select ${errors.school_type ? 'is-invalid' : ''}`}
                      value={form.school_type} onChange={handleChange}
                    >
                      <option value="">Select type...</option>
                      <option value="private_day">Private Day School</option>
                      <option value="private_boarding">Private Boarding School</option>
                      <option value="public_day">Public Day School</option>
                      <option value="public_boarding">Public Boarding School</option>
                    </select>
                    {errors.school_type && <div className="invalid-feedback">{errors.school_type}</div>}
                  </div>

                  {/* Contact Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>
                      Principal / Contact Name <span className="text-danger">*</span>
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
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>
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

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email" name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={form.email} onChange={handleChange}
                      placeholder="school@example.co.ke"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* County */}
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>County</label>
                    <select name="county" className="form-select" value={form.county} onChange={handleChange}>
                      <option value="">Select county...</option>
                      {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Number of students */}
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>Number of Students</label>
                    <input
                      type="number" name="num_students" className="form-control"
                      value={form.num_students} onChange={handleChange}
                      min="1" placeholder="e.g. 600"
                    />
                  </div>

                  {/* Monthly bill */}
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>Monthly KPLC Bill (KES)</label>
                    <input
                      type="number" name="monthly_bill" className="form-control"
                      value={form.monthly_bill} onChange={handleChange}
                      min="0" placeholder="e.g. 85000"
                    />
                  </div>

                  {/* Preferred Plan */}
                  <div className="col-12">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>Preferred Plan</label>
                    <select name="preferred_plan" className="form-select" value={form.preferred_plan} onChange={handleChange}>
                      <option value="">Not Sure Yet — Let Us Recommend</option>
                      <option value="rent_to_own">Rent-to-Own (School owns after 36–60 months)</option>
                      <option value="rent_only">Rent-Only (Zero capital responsibility)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label className="form-label fw-600" style={{ fontWeight: 600 }}>Message (Optional)</label>
                    <textarea
                      name="message" className="form-control" rows={4}
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us about your school's energy situation, water needs, or any specific requirements..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn-brand-accent w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ padding: '15px 28px', borderRadius: '10px', fontSize: '1rem', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...</>
                      ) : (
                        <><i className="bi bi-calendar-check"></i> Request Your Free School Energy Audit</>
                      )}
                    </button>
                    <p className="text-center mt-3 mb-0" style={{ color: 'var(--color-gray)', fontSize: '0.82rem' }}>
                      <i className="bi bi-lock me-1"></i>
                      Your information is private and will never be shared with third parties.{' '}
                      By submitting, you agree to our{' '}
                      <a href="/privacy-policy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Privacy Policy</a>
                      {' '}and{' '}
                      <a href="/terms" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Terms of Service</a>.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact info sidebar */}
          <div className="col-lg-4">
            <div
              className="rounded-brand p-4 h-100"
              style={{
                background: 'linear-gradient(160deg, var(--color-primary) 0%, #1a1745 100%)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h4 className="text-white fw-700 mb-4" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Our Offices
              </h4>

              {[
                {
                  icon: 'bi-building',
                  label: 'Head Office',
                  value: 'Nairobi, Kenya',
                  accent: true,
                },
                {
                  icon: 'bi-building',
                  label: 'Branch Office',
                  value: 'Nanyuki, Kenya',
                  accent: false,
                },
              ].map((item) => (
                <div key={item.label} className="d-flex gap-3 mb-4">
                  <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ width: 36, height: 36, borderRadius: '9px', background: 'rgba(255,255,255,0.1)' }}
                  >
                    <i className={`bi ${item.icon}`} style={{ color: 'var(--color-accent)', fontSize: '1rem' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                      {item.label}
                    </div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{item.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '24px' }} />

              {[
                { icon: 'bi-telephone', label: 'Phone', value: C.phone, href: `tel:${C.phone}` },
                { icon: 'bi-envelope', label: 'Email', value: C.email, href: `mailto:${C.email}` },
                { icon: 'bi-whatsapp', label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${C.whatsapp}` },
                { icon: 'bi-clock', label: 'Response Time', value: C.responseTime, href: null },
              ].map((item) => (
                <div key={item.label} className="d-flex gap-3 mb-4">
                  <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ width: 36, height: 36, borderRadius: '9px', background: 'rgba(255,255,255,0.1)' }}
                  >
                    <i className={`bi ${item.icon}`} style={{ color: 'var(--color-accent)', fontSize: '1rem' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.icon === 'bi-whatsapp' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '24px' }} />

              <div
                style={{
                  background: 'rgba(243,163,120,0.12)',
                  border: '1px solid rgba(243,163,120,0.25)',
                  borderRadius: '10px',
                  padding: '16px',
                }}
              >
                <i className="bi bi-shield-check me-2" style={{ color: 'var(--color-accent)' }}></i>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  No commitment required. Your free audit comes with zero obligation to proceed.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
