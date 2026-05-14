import { useEffect } from 'react';
import { CONTACT } from '../utils/constants';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — Waterlift Solar Savings';
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: '1. Who We Are',
      body: `Waterlift Solar Savings is a specialized solar energy service operated by Waterlift Solar Limited, a company registered in Kenya. In this policy, "we", "us", and "our" refer to Waterlift Solar Limited. Our registered address is ${CONTACT.address}.`,
    },
    {
      title: '2. Information We Collect',
      body: `When you submit a contact or audit request form on this website, we collect: your name and role, school name and type, location (county), contact phone number, contact email address, number of students, and monthly electricity bill estimate. We may also collect basic analytics data (pages visited, device type) through our website infrastructure. We do not use third-party advertising cookies.`,
    },
    {
      title: '3. How We Use Your Information',
      body: `We use the information you provide to: (a) contact you to arrange a free school energy audit; (b) prepare a customised solar proposal for your school; (c) follow up on your enquiry via phone, email, or WhatsApp; (d) improve our services and website. We do not sell, rent, or trade your personal information to any third party. We may share your information with trusted service partners (e.g., installation sub-contractors) only as necessary to deliver our services.`,
    },
    {
      title: '4. Legal Basis for Processing',
      body: `We process your personal data on the basis of your consent (by voluntarily submitting our contact form) and our legitimate interest in providing solar energy services to Kenyan schools. You may withdraw consent at any time by contacting us at ${CONTACT.email}.`,
    },
    {
      title: '5. Data Retention',
      body: `We retain your enquiry data for up to 24 months from your last interaction with us, after which it is securely deleted unless we have an ongoing business relationship with your school.`,
    },
    {
      title: '6. Your Rights',
      body: `You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, contact us at ${CONTACT.email} or call ${CONTACT.phone}.`,
    },
    {
      title: '7. Meta Advertising',
      body: `We may run targeted advertisements on Meta platforms (Facebook, Instagram). If you arrive at this website via a Meta advertisement, Meta may have provided us with aggregated audience data. We do not receive your personal Facebook profile data. You can manage your Meta ad preferences at facebook.com/ads/preferences.`,
    },
    {
      title: '8. Cookies',
      body: `This website uses only essential cookies required for the site to function. We do not use tracking, analytics, or advertising cookies without your explicit consent.`,
    },
    {
      title: '9. Changes to This Policy',
      body: `We may update this Privacy Policy from time to time. The current version will always be available at this URL. Continued use of this website after changes constitutes acceptance of the updated policy.`,
    },
    {
      title: '10. Contact',
      body: `For privacy-related queries, contact: Waterlift Solar Limited, ${CONTACT.address}. Email: ${CONTACT.email}. Phone: ${CONTACT.phone}.`,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <div style={{ background: 'var(--color-primary)', padding: '80px 0 60px' }}>
        <div className="container text-center">
          <h1 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 12 }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
            Waterlift Solar Limited &mdash; Last updated: April 2026
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, marginBottom: 32 }}>
              This Privacy Policy explains how <strong>Waterlift Solar Limited</strong> (operating as
              Waterlift Solar Savings) collects, uses, and protects the personal information you provide
              when you use this website or contact us about our solar energy services.
            </p>

            {sections.map((s) => (
              <div key={s.title} className="mb-4">
                <h3 style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, marginBottom: 0 }}>{s.body}</p>
              </div>
            ))}

            <div className="mt-5 text-center">
              <a href="/" className="btn-brand-accent text-decoration-none d-inline-flex align-items-center gap-2"
                style={{ padding: '13px 28px', borderRadius: '9px', fontSize: '0.95rem' }}>
                <i className="bi bi-arrow-left"></i> Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>

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
