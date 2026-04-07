import { CONTACT } from '../utils/constants';
import { useSettings } from '../context/SettingsContext';
import logo from '../assets/logo.jpeg';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Plans', href: '#plans' },
  { label: 'Savings Calculator', href: '#calculator' },
  { label: 'Schools We Serve', href: '#school-types' },
  { label: 'Why Waterlift Solar', href: '#why-waterlift' },
  { label: 'School Stories', href: '#testimonials' },
  { label: 'FAQ', href: '#faqs' },
  { label: 'Get Free Audit', href: '#contact' },
  { label: 'Contact Us', href: '#contact' },
];

const SERVICES = [
  'Solar Installation',
  'Battery Storage',
  'Water Pump Systems',
  'Borehole Integration',
  'Remote Monitoring',
  'Maintenance & Support',
];

const SOCIAL = [
  { icon: 'bi-facebook', href: '#', label: 'Facebook' },
  { icon: 'bi-twitter-x', href: '#', label: 'X (Twitter)' },
  { icon: 'bi-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'bi-instagram', href: '#', label: 'Instagram' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const liveSettings = useSettings();
  // Merge live settings over static CONTACT defaults
  const C = { ...CONTACT, ...liveSettings };

  return (
    <footer id="footer" style={{ background: 'var(--color-primary)', color: 'rgba(255,255,255,0.75)' }}>
      <div className="container py-5">
        <div className="row g-5">
          {/* Brand column */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-3">
              <img
                src={logo}
                alt="Waterlift Solar Savings"
                style={{ height: 56, width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}>
              A division of {C.company}
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: 320, marginBottom: '20px' }}>
              Solar power solutions designed specifically for Kenyan schools. Zero upfront cost. 1,400+ installations across all 47 counties. Saving schools money since 2018.
            </p>

            {/* Social */}
            <div className="d-flex gap-3 mt-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'var(--transition)',
                    fontSize: '1rem',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <i className={`bi ${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-white fw-700 mb-4" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Quick Links
            </h6>
            <ul className="list-unstyled">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.label} className="mb-2">
                  <a
                    href={l.href}
                    style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.86rem', transition: 'var(--transition)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              {NAV_LINKS.slice(5).map((l) => (
                <li key={l.label} className="mb-2">
                  <a
                    href={l.href}
                    style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.86rem', transition: 'var(--transition)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-700 mb-4" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Services
            </h6>
            <ul className="list-unstyled">
              {SERVICES.map((s) => (
                <li key={s} className="mb-2">
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.86rem' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-700 mb-4" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Contact
            </h6>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}></i>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{C.address}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>{C.addressBranch}</div>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start gap-2">
                <i className="bi bi-telephone mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}></i>
                <a href={`tel:${C.phone}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.86rem' }}>
                  {C.phone}
                </a>
              </li>
              <li className="mb-3 d-flex align-items-start gap-2">
                <i className="bi bi-envelope mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}></i>
                <a href={`mailto:${C.email}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.86rem' }}>
                  {C.email}
                </a>
              </li>
              <li className="mb-3 d-flex align-items-start gap-2">
                <i className="bi bi-whatsapp mt-1 flex-shrink-0" style={{ color: '#25D366', fontSize: '0.9rem' }}></i>
                <a
                  href={`https://wa.me/${C.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.86rem' }}
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-clock mt-1 flex-shrink-0" style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}></i>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.86rem' }}>{C.responseTime}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container py-4">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-7">
              <p className="mb-1" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
                Waterlift Solar Savings is a division of {C.company}. CEO: {C.ceo}. Registered in Kenya.
              </p>
              <p className="mb-0" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}>
                © {year} {C.company}. All Rights Reserved.
              </p>
            </div>
            <div className="col-12 col-md-5 d-flex gap-3 justify-content-md-end flex-wrap">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
                <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
