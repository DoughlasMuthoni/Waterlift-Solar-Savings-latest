import { useEffect, useState } from 'react';
import logo from '../assets/logo.jpeg';
import { useSettings } from '../context/SettingsContext';

const NAV_LINKS = [
  { label: 'Home',         href: '#hero' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Plans',        href: '#plans' },
  { label: 'Calculator',   href: '#calculator' },
  { label: 'Contact',      href: '#contact' },
];

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { whatsapp: whatsappNumber } = useSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top${scrolled ? ' scrolled' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
        borderBottom: scrolled ? 'none' : '1px solid rgba(38,33,97,0.07)',
        transition: 'box-shadow 0.35s ease, background-color 0.35s ease',
        zIndex: 1050,
      }}
    >
      <div className="container">

        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center text-decoration-none gap-2" href="#hero">
          <img
            src={logo}
            alt="Waterlift Solar Savings"
            style={{ height: 50, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0 shadow-none p-2"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          style={{
            color: 'var(--color-primary)',
            borderRadius: '8px',
            transition: 'background 0.2s',
            backgroundColor: menuOpen ? 'var(--color-light)' : 'transparent',
          }}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1.4rem' }}></i>
        </button>

        {/* Nav */}
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarMain">
          <ul className="navbar-nav mx-auto gap-1">
            {NAV_LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <a
                  className="nav-link px-3 py-2 position-relative"
                  href={link.href}
                  onClick={handleNavClick}
                  style={{
                    color: 'var(--color-dark)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    transition: 'color 0.2s, background 0.2s',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.background = 'var(--color-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-dark)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="d-flex gap-2 align-items-center flex-wrap mt-2 mt-lg-0">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 text-decoration-none px-3 py-2"
              style={{
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                borderRadius: '8px',
                transition: 'var(--transition)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-light)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <i className="bi bi-whatsapp" style={{ color: '#25D366', fontSize: '1rem' }}></i>
              WhatsApp Us
            </a>

            <a
              href="#contact"
              className="btn-brand-accent d-inline-flex align-items-center gap-2 text-decoration-none px-4 py-2"
              style={{ fontSize: '0.88rem', borderRadius: '8px' }}
              onClick={handleNavClick}
            >
              <i className="bi bi-calendar-check"></i>
              Free Audit
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
