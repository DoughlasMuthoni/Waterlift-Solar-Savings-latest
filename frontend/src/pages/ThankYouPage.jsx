import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

export default function ThankYouPage() {
  useEffect(() => {
    document.title = 'Thank You — Waterlift Solar Savings';
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #262161 0%, #1a1745 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      {/* Logo */}
      <img src={logo} alt="Waterlift Solar Savings" style={{ height: 56, width: 'auto', objectFit: 'contain', marginBottom: 40 }} />

      {/* Card */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(36px, 6vw, 56px) clamp(28px, 6vw, 56px)', maxWidth: 520, width: '100%', textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}>
        {/* Check icon */}
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <i className="bi bi-check-lg" style={{ fontSize: '2rem', color: '#22C55E' }}></i>
        </div>

        <h1 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 12 }}>
          Thank You!
        </h1>
        <p style={{ color: 'var(--color-gray)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 8 }}>
          We've received your request for a <strong>free energy audit</strong>.
        </p>
        <p style={{ color: 'var(--color-gray)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32 }}>
          One of our school energy specialists will call you within <strong>24 hours</strong>, Monday to Saturday.
        </p>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/254768117070?text=Hi%2C%20I%20just%20submitted%20an%20audit%20request%20and%20wanted%20to%20follow%20up."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#25D366', color: '#fff', fontWeight: 700,
            borderRadius: 10, padding: '14px 28px', textDecoration: 'none',
            fontSize: '0.97rem', marginBottom: 20,
          }}
        >
          <i className="bi bi-whatsapp" style={{ fontSize: '1.1rem' }}></i>
          Can't wait? Chat with us now
        </a>

        <div>
          <Link
            to="/"
            style={{ color: 'var(--color-primary)', fontSize: '0.88rem', textDecoration: 'underline' }}
          >
            ← Back to homepage
          </Link>
        </div>
      </div>

      {/* Bottom note */}
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginTop: 32 }}>
        © {new Date().getFullYear()} Waterlift Solar Limited. All Rights Reserved.
      </p>
    </div>
  );
}
