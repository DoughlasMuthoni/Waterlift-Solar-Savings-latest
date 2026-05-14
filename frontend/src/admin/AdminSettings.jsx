import { useState, useEffect } from 'react';
import api from '../utils/api';

const SITE_FIELDS = [
  { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+254 768 117 070' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', placeholder: '254768117070 (no +)' },
  { key: 'email', label: 'Contact Email', type: 'email', placeholder: 'info@waterlift.co.ke' },
  { key: 'address', label: 'Address', type: 'text', placeholder: 'Nairobi, Kenya' },
  { key: 'hero_headline', label: 'Hero Headline', type: 'text', placeholder: 'Cut Your School\'s Power Bills by Up to 80%' },
  { key: 'hero_subtext', label: 'Hero Subtext', type: 'textarea', placeholder: 'Supporting subheadline text...' },
];

const CALC_FIELDS = [
  { key: 'savings_percentage', label: 'Savings Rate (0–1)', type: 'number', placeholder: '0.75', hint: 'e.g. 0.75 = 75% savings' },
  { key: 'installation_cost_per_kw', label: 'Installation Cost per kW (KES)', type: 'number', placeholder: '85000' },
  { key: 'avg_system_size_kw', label: 'Average System Size (kW)', type: 'number', placeholder: '20' },
  { key: 'payback_years', label: 'Average Payback Period (years)', type: 'number', placeholder: '4' },
  { key: 'co2_per_kwh_kg', label: 'CO₂ per kWh (kg)', type: 'number', placeholder: '0.51' },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('site');
  const [site, setSite] = useState({});
  const [calc, setCalc] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    api.get('/api/admin/settings')
      .then((r) => {
        setSite(r.data.data?.site || {});
        setCalc(r.data.data?.calculator || {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSite = (e) => setSite((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleCalc = (e) => setCalc((p) => ({ ...p, [e.target.name]: e.target.value }));

  const save = async () => {
    setSaving(true);
    setAlert(null);
    try {
      await api.post('/api/admin/settings', { site, calculator: calc });
      setAlert({ type: 'success', msg: 'Settings saved successfully.' });
    } catch (e) {
      setAlert({ type: 'error', msg: e.response?.data?.message || 'Failed to save settings.' });
    } finally { setSaving(false); }
  };

  if (loading) return <div className="text-center py-5" style={{ color: 'var(--color-gray)' }}><span className="spinner-border spinner-border-sm me-2"></span>Loading settings...</div>;

  return (
    <div>
      {alert && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
          <i className={`bi ${alert.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'} me-2`}></i>
          {alert.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="d-flex gap-2 mb-4">
        {[['site', 'Site Settings', 'bi-globe'], ['calc', 'Calculator Settings', 'bi-calculator']].map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="d-flex align-items-center gap-2"
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: `1px solid ${activeTab === id ? 'var(--color-primary)' : '#e5e7eb'}`,
              background: activeTab === id ? 'var(--color-primary)' : '#fff',
              color: activeTab === id ? '#fff' : 'var(--color-gray)',
              fontWeight: activeTab === id ? 700 : 400,
              cursor: 'pointer',
              fontSize: '0.88rem',
              transition: 'var(--transition)',
            }}
          >
            <i className={`bi ${icon}`}></i>{label}
          </button>
        ))}
      </div>

      <div className="rounded-brand p-4 p-lg-5" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
        {activeTab === 'site' && (
          <div className="row g-4">
            {SITE_FIELDS.map(({ key, label, type, placeholder, hint }) => (
              <div key={key} className={type === 'textarea' ? 'col-12' : 'col-md-6'}>
                <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>{label}</label>
                {type === 'textarea' ? (
                  <textarea name={key} className="form-control" rows={3} value={site[key] || ''} onChange={handleSite} placeholder={placeholder} />
                ) : (
                  <input type={type} name={key} className="form-control" value={site[key] || ''} onChange={handleSite} placeholder={placeholder} />
                )}
                {hint && <div className="form-text">{hint}</div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'calc' && (
          <div className="row g-4">
            {CALC_FIELDS.map(({ key, label, type, placeholder, hint }) => (
              <div key={key} className="col-md-6">
                <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>{label}</label>
                <input type={type} name={key} className="form-control" value={calc[key] || ''} onChange={handleCalc} placeholder={placeholder} step="any" />
                {hint && <div className="form-text">{hint}</div>}
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
          <button
            className="btn-brand-accent d-flex align-items-center gap-2"
            style={{ padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }}
            onClick={save}
            disabled={saving}
          >
            {saving ? <><span className="spinner-border spinner-border-sm"></span> Saving...</> : <><i className="bi bi-check-circle"></i> Save Settings</>}
          </button>
        </div>
      </div>
    </div>
  );
}
