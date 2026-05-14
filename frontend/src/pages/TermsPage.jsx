import { useEffect } from 'react';
import { CONTACT } from '../utils/constants';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service — Waterlift Solar Savings';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <div style={{ background: 'var(--color-primary)', padding: '80px 0 60px' }}>
        <div className="container text-center">
          <h1 style={{ color: '#ffffff', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 12 }}>
            Terms of Service
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
              These Terms of Service govern your use of the Waterlift Solar Savings website
              (waterliftsolarsavings.africa) operated by <strong>Waterlift Solar Limited</strong>,
              a company registered in Kenya.
            </p>

            {[
              {
                title: '1. Service Description',
                body: 'Waterlift Solar Savings is an online platform that enables Kenyan schools to request free solar energy audits, receive customised solar proposals, and engage Waterlift Solar Limited for solar installation, battery storage, and related services.',
              },
              {
                title: '2. Enquiry Submissions',
                body: 'By submitting a contact or audit request form, you confirm that the information you provide is accurate and that you are authorised to act on behalf of the named school or institution. Submission of the form does not constitute a binding contract — it is an expression of interest that initiates a consultation process.',
              },
              {
                title: '3. No Guarantee of Service Availability',
                body: 'While we serve 38 counties across Kenya, service availability and system sizing are subject to a site assessment. We reserve the right to decline an installation if technical or logistical constraints make it unfeasible.',
              },
              {
                title: '4. Intellectual Property',
                body: 'All content on this website — including text, images, logos, and design — is the property of Waterlift Solar Limited and may not be reproduced without written permission.',
              },
              {
                title: '5. Limitation of Liability',
                body: 'The information on this website is provided for general informational purposes. Savings estimates and projections are indicative only and based on average school energy profiles. Actual savings will depend on your school\'s specific energy consumption and system configuration.',
              },
              {
                title: '6. Governing Law',
                body: 'These terms are governed by the laws of the Republic of Kenya. Any disputes shall be resolved in the courts of Kenya.',
              },
              {
                title: '7. Contact',
                body: `For questions about these terms, contact us at: ${CONTACT.email} or ${CONTACT.phone}.`,
              },
            ].map((s) => (
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
