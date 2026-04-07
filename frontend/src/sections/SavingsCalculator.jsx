import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import api from '../utils/api';

const DEFAULT_SETTINGS = {
  savings_percentage: 0.75,
  payback_years: 4,
};

export default function SavingsCalculator() {
  const titleRef = useScrollReveal();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [monthlyBill, setMonthlyBill] = useState(50000);
  const [schoolType, setSchoolType] = useState('secondary');
  const [numStudents, setNumStudents] = useState(500);

  useEffect(() => {
    api.get('/api/calculator-settings')
      .then((res) => {
        const data = res.data?.data || {};
        setSettings((prev) => ({
          ...prev,
          savings_percentage: parseFloat(data.savings_percentage) || prev.savings_percentage,
          payback_years: parseFloat(data.payback_years) || prev.payback_years,
        }));
      })
      .catch(() => {/* use defaults */});
  }, []);

  const savingsPct = settings.savings_percentage;
  const monthlySavings = Math.round(monthlyBill * savingsPct);
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = annualSavings * 5;
  const paybackYears = settings.payback_years;

  return (
    <section id="calculator" className="section-py" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #fff 100%)' }}>
      <div className="container">
        <div ref={titleRef} className="fade-up text-center mb-5">
          <h2 className="section-title mb-3">Savings Estimator</h2>
          <div className="divider-accent"></div>
          <p className="section-subtitle mt-3">
            Get an instant estimate of how much your school could save each month, each year, and over 5 years. Based on real Kenyan school data from 1,400+ installations.
          </p>
        </div>

        <div className="row g-5 align-items-center">
          {/* Inputs */}
          <div className="col-lg-6">
            <div
              className="rounded-brand p-4 p-lg-5"
              style={{ background: '#fff', boxShadow: 'var(--shadow-md)', border: '1px solid #e5e7eb' }}
            >
              <h4 className="fw-700 mb-4" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                Your School's Details
              </h4>

              {/* Monthly Bill */}
              <div className="mb-4">
                <label className="form-label fw-600 mb-2" style={{ color: '#374151', fontWeight: 600 }}>
                  Monthly KPLC Bill (KES)
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg mb-2"
                  value={monthlyBill}
                  min={5000}
                  max={500000}
                  step={1000}
                  onChange={(e) => setMonthlyBill(Math.max(0, parseInt(e.target.value) || 0))}
                />
                <input
                  type="range"
                  className="form-range"
                  min={5000}
                  max={500000}
                  step={1000}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <div className="d-flex justify-content-between" style={{ fontSize: '0.78rem', color: 'var(--color-gray)' }}>
                  <span>KES 5,000</span><span>KES 500,000</span>
                </div>
              </div>

              {/* School Type */}
              <div className="mb-4">
                <label className="form-label fw-600 mb-2" style={{ color: '#374151', fontWeight: 600 }}>
                  School Type
                </label>
                <select
                  className="form-select"
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value)}
                >
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="boarding">Boarding School</option>
                  <option value="polytechnic">Polytechnic / TVET</option>
                  <option value="university">University / College</option>
                </select>
              </div>

              {/* Number of Students */}
              <div className="mb-0">
                <label className="form-label fw-600 mb-2" style={{ color: '#374151', fontWeight: 600 }}>
                  Number of Students
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={numStudents}
                  min={50}
                  max={5000}
                  onChange={(e) => setNumStudents(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="col-lg-6">
            <div
              className="rounded-brand p-4 p-lg-5"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h4 className="fw-700 mb-4 text-white" style={{ fontWeight: 700 }}>
                <i className="bi bi-calculator me-2" style={{ color: 'var(--color-accent)' }}></i>
                Your Estimated Savings
              </h4>

              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>Current monthly bill</span>
                  <span className="fw-700 text-white">KES {monthlyBill.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>Solar savings rate</span>
                  <span className="fw-700" style={{ color: 'var(--color-accent)' }}>{Math.round(savingsPct * 100)}%</span>
                </div>
              </div>

              {[
                { label: 'Monthly Savings', value: `KES ${monthlySavings.toLocaleString()}`, large: false },
                { label: 'Annual Savings', value: `KES ${annualSavings.toLocaleString()}`, large: false },
                { label: '5-Year Savings', value: `KES ${fiveYearSavings.toLocaleString()}`, large: true },
                { label: 'Est. Payback Period', value: `~${paybackYears} years`, large: false },
              ].map(({ label, value, large }) => (
                <div key={label} className="d-flex justify-content-between align-items-center mb-3">
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{label}</span>
                  <span
                    className="fw-700"
                    style={{
                      color: large ? 'var(--color-accent)' : '#fff',
                      fontSize: large ? '1.4rem' : '1.05rem',
                      fontWeight: 700,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}

              <div
                className="mt-4 p-3 rounded-brand"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Estimates based on average performance. Get a precise report from our engineers — it's free.
                </p>
              </div>

              <a
                href="#contact"
                className="btn-brand-accent text-decoration-none text-center d-block mt-4 py-3 fw-700"
                style={{ borderRadius: '10px', fontSize: '0.95rem' }}
              >
                Get My Exact Savings Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
