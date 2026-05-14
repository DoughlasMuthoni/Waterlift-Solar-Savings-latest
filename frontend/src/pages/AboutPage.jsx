import { useEffect } from 'react';
import logo from '../assets/logo.jpeg';
import { CONTACT } from '../utils/constants';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us — Waterlift Solar Savings';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: 'var(--color-primary)', padding: '80px 0 60px' }}>
        <div className="container text-center">
          <img src={logo} alt="Waterlift Solar Savings" style={{ height: 64, width: 'auto', objectFit: 'contain', marginBottom: 24 }} />
          <h1 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: 16 }}>
            About Waterlift Solar Savings
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
            Solar power solutions designed specifically for Kenyan schools — zero upfront cost, real savings from day one.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Legal disclaimer */}
            <div
              className="rounded-brand p-4 mb-5"
              style={{
                background: 'rgba(239,105,34,0.06)',
                border: '1.5px solid rgba(239,105,34,0.25)',
              }}
            >
              <h5 style={{ color: 'var(--color-accent)', fontWeight: 700, marginBottom: 8 }}>
                <i className="bi bi-info-circle me-2"></i>Legal Notice
              </h5>
              <p style={{ color: 'var(--color-gray)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: 0 }}>
                <strong>Waterlift Solar Savings</strong> is a specialized solar energy service operated by{' '}
                <strong>Waterlift Solar Limited</strong>, a company registered in Kenya. All contracts, invoices,
                and legal documentation are issued by Waterlift Solar Limited.
              </p>
            </div>

            {/* Who we are */}
            <h2 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.6rem', marginBottom: 16 }}>
              Who We Are
            </h2>
            <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, marginBottom: 20 }}>
              Waterlift Solar Limited has been delivering renewable energy solutions across Kenya since 2018.
              Our flagship programme — <strong>Waterlift Solar Savings</strong> — was built specifically for
              Kenyan schools, offering zero-upfront-cost solar installations through flexible Rent-to-Own
              and Rent-Only plans.
            </p>
            <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, marginBottom: 32 }}>
              With over <strong>1,400 installations</strong> spanning <strong>38 counties</strong>,
              we are Kenya's leading provider of school-specific solar energy solutions. Our mission is simple:
              help every Kenyan school cut energy costs, eliminate outages, and redirect savings toward education.
            </p>

            {/* What we do */}
            <h2 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.6rem', marginBottom: 16 }}>
              What We Do
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4">
              {[
                { icon: 'bi-sun', title: 'Solar Installation', desc: 'EPRA-licensed rooftop solar systems sized for your school\'s exact energy profile.' },
                { icon: 'bi-battery-charging', title: 'Battery Storage', desc: 'Lithium battery backup to keep critical systems running during Kenya Power outages.' },
                { icon: 'bi-droplet', title: 'Water Pump Systems', desc: 'Solar-powered borehole pumps and water storage for schools in water-stressed areas.' },
                { icon: 'bi-graph-up', title: 'Remote Monitoring', desc: '24/7 system monitoring with real-time alerts and monthly performance reports.' },
              ].map((item) => (
                <div key={item.title} className="col">
                  <div
                    className="d-flex gap-3 p-3 rounded-brand h-100"
                    style={{ border: '1px solid rgba(38,33,97,0.1)', background: '#fafafa' }}
                  >
                    <div
                      className="flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(239,105,34,0.1)' }}
                    >
                      <i className={`bi ${item.icon}`} style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: 4 }}>{item.title}</div>
                      <div style={{ color: 'var(--color-gray)', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance */}
            <h2 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.6rem', marginBottom: 16 }}>
              Licensing &amp; Compliance
            </h2>
            <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, marginBottom: 32 }}>
              Waterlift Solar Limited is fully licensed by the{' '}
              <strong>Energy and Petroleum Regulatory Authority of Kenya (EPRA)</strong>. Every installation
              meets <strong>Kenya Bureau of Standards (KEBS)</strong> requirements. Schools receive a complete
              Completion Certificate package upon commissioning.
            </p>

            {/* Contact */}
            <h2 style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.6rem', marginBottom: 16 }}>
              Contact Us
            </h2>
            <div className="row g-3 mb-5">
              {[
                { icon: 'bi-geo-alt', label: 'Head Office', value: CONTACT.address },
                { icon: 'bi-geo-alt', label: 'Nanyuki Branch', value: CONTACT.addressBranch },
                { icon: 'bi-telephone', label: 'Phone', value: CONTACT.phone },
                { icon: 'bi-envelope', label: 'Email', value: CONTACT.email },
              ].map((item) => (
                <div key={item.label} className="col-12 col-sm-6">
                  <div className="d-flex gap-2 align-items-start">
                    <i className={`bi ${item.icon} mt-1 flex-shrink-0`} style={{ color: 'var(--color-accent)', fontSize: '0.95rem' }}></i>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--color-gray)', lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="/" className="btn-brand-accent text-decoration-none d-inline-flex align-items-center gap-2"
                style={{ padding: '13px 28px', borderRadius: '9px', fontSize: '0.95rem' }}>
                <i className="bi bi-arrow-left"></i> Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom legal bar */}
      <div style={{ borderTop: '1px solid rgba(38,33,97,0.08)', padding: '20px 0', background: '#f8f9fa' }}>
        <div className="container text-center">
          <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: 0 }}>
            Waterlift Solar Savings is a specialized service of <strong>Waterlift Solar Limited</strong>.
            Registered in Kenya. &copy; {new Date().getFullYear()} Waterlift Solar Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
