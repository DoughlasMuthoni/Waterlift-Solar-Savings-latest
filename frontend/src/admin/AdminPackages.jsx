import { useState, useEffect } from 'react';
import api from '../utils/api';

const EMPTY_PKG = {
  name: '', badge: '', popular: false, tagline: '', features: [''], note: '', active: true, sort_order: 0,
};

function FeatureEditor({ features, onChange }) {
  const update = (i, val) => {
    const next = [...features];
    next[i] = val;
    onChange(next);
  };
  const add = () => onChange([...features, '']);
  const remove = (i) => onChange(features.filter((_, idx) => idx !== i));

  return (
    <div>
      {features.map((f, i) => (
        <div key={i} className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control form-control-sm"
            value={f}
            placeholder={`Feature ${i + 1}`}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-danger flex-shrink-0"
            onClick={() => remove(i)}
            disabled={features.length === 1}
            style={{ width: 34 }}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary"
        onClick={add}
        style={{ fontSize: '0.8rem' }}
      >
        <i className="bi bi-plus me-1"></i>Add Feature
      </button>
    </div>
  );
}

export default function AdminPackages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadPackages = () => {
    setLoading(true);
    api.get('/api/admin/packages')
      .then((r) => setItems(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPackages(); }, []);

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY_PKG, features: [''] } });
  const openEdit = (item) => setModal({
    mode: 'edit',
    data: {
      ...item,
      features: item.features?.length ? item.features : [''],
    },
  });
  const closeModal = () => { setModal(null); setError(''); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModal((m) => ({
      ...m,
      data: { ...m.data, [name]: type === 'checkbox' ? checked : name === 'sort_order' ? parseInt(value) || 0 : value },
    }));
  };

  const handleFeatures = (features) => setModal((m) => ({ ...m, data: { ...m.data, features } }));

  const handleSave = async () => {
    const { mode, data } = modal;
    if (!data.name.trim()) { setError('Package name is required.'); return; }
    setSaving(true);
    setError('');
    const payload = {
      ...data,
      features: data.features.filter((f) => f.trim() !== ''),
    };
    try {
      if (mode === 'add') await api.post('/api/admin/packages', payload);
      else await api.put(`/api/admin/packages/${data.id}`, payload);
      closeModal();
      loadPackages();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save.');
    } finally { setSaving(false); }
  };

  const handleDelete = (id, name) => {
    if (!confirm(`Delete package "${name}"? This cannot be undone.`)) return;
    api.delete(`/api/admin/packages/${id}`).then(loadPackages).catch(() => alert('Delete failed'));
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p style={{ color: 'var(--color-gray)', fontSize: '0.88rem', margin: 0 }}>
            {items.length} package{items.length !== 1 ? 's' : ''} — shown on the website as pricing plans
          </p>
        </div>
        <button
          className="btn-brand-accent d-flex align-items-center gap-2"
          style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }}
          onClick={openAdd}
        >
          <i className="bi bi-plus-lg"></i>Add Package
        </button>
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="text-center py-5" style={{ color: 'var(--color-gray)' }}>
          <span className="spinner-border spinner-border-sm me-2"></span>Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-5 rounded-brand" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
          <i className="bi bi-box d-block mb-3" style={{ fontSize: '2.5rem', color: '#d1d5db' }}></i>
          <p style={{ color: 'var(--color-gray)' }}>No packages yet. Add your first pricing plan.</p>
          <button className="btn-brand-accent" style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={openAdd}>
            <i className="bi bi-plus me-1"></i>Add Package
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((pkg) => (
            <div className="col-md-6 col-xl-4" key={pkg.id}>
              <div
                className="rounded-brand h-100"
                style={{
                  background: pkg.popular ? 'linear-gradient(160deg, var(--color-primary) 0%, #1a1745 100%)' : '#fff',
                  border: pkg.popular ? '2px solid var(--color-accent)' : '1px solid #e5e7eb',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                }}
              >
                {/* Card header */}
                <div className="p-4 pb-3">
                  <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                    <div>
                      <span
                        className="badge mb-2"
                        style={{
                          background: pkg.popular ? 'var(--color-accent)' : 'rgba(38,33,97,0.08)',
                          color: pkg.popular ? 'var(--color-primary)' : 'var(--color-primary)',
                          borderRadius: 50, fontSize: '0.72rem', fontWeight: 700,
                          padding: '4px 10px',
                        }}
                      >
                        {pkg.badge || 'No badge'}
                      </span>
                      <h5 style={{ color: pkg.popular ? '#fff' : 'var(--color-primary)', fontWeight: 800, margin: 0, fontSize: '1.2rem' }}>
                        {pkg.name}
                      </h5>
                    </div>
                    <div className="d-flex gap-1 flex-shrink-0">
                      {!pkg.active && (
                        <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>
                  {pkg.tagline && (
                    <p style={{ color: pkg.popular ? 'rgba(255,255,255,0.65)' : 'var(--color-gray)', fontSize: '0.83rem', margin: 0, lineHeight: 1.55 }}>
                      {pkg.tagline}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: pkg.popular ? 'rgba(255,255,255,0.12)' : '#f3f4f6', margin: '0 16px' }} />

                {/* Features */}
                <div className="px-4 py-3">
                  <ul className="list-unstyled mb-0">
                    {(pkg.features || []).slice(0, 4).map((f, i) => (
                      <li key={i} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: '0.82rem' }}>
                        <i className="bi bi-check-circle-fill flex-shrink-0 mt-1" style={{ color: pkg.popular ? 'var(--color-accent)' : 'var(--color-primary)', fontSize: '0.78rem' }}></i>
                        <span style={{ color: pkg.popular ? 'rgba(255,255,255,0.8)' : '#374151' }}>{f}</span>
                      </li>
                    ))}
                    {pkg.features?.length > 4 && (
                      <li style={{ fontSize: '0.78rem', color: pkg.popular ? 'rgba(255,255,255,0.45)' : 'var(--color-gray)' }}>
                        +{pkg.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions footer */}
                <div
                  className="px-4 py-3 d-flex gap-2"
                  style={{ borderTop: `1px solid ${pkg.popular ? 'rgba(255,255,255,0.1)' : '#f3f4f6'}` }}
                >
                  <button
                    className="btn btn-sm flex-grow-1"
                    style={{
                      background: pkg.popular ? 'rgba(255,255,255,0.12)' : 'rgba(38,33,97,0.06)',
                      color: pkg.popular ? '#fff' : 'var(--color-primary)',
                      border: 'none', borderRadius: 6, fontWeight: 600, fontSize: '0.82rem',
                    }}
                    onClick={() => openEdit(pkg)}
                  >
                    <i className="bi bi-pencil me-1"></i>Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: '0.82rem' }}
                    onClick={() => handleDelete(pkg.id, pkg.name)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content rounded-brand" style={{ border: 'none' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb' }}>
                <h5 className="modal-title fw-700" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                  {modal.mode === 'add' ? 'Add New Package' : `Edit — ${modal.data.name}`}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem' }}>{error}</div>}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Package Name *</label>
                    <input type="text" name="name" className="form-control" value={modal.data.name} onChange={handleChange} placeholder="e.g. Rent-to-Own" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Badge Label</label>
                    <input type="text" name="badge" className="form-control" value={modal.data.badge} onChange={handleChange} placeholder="e.g. Most Popular" />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Order</label>
                    <input type="number" name="sort_order" className="form-control" value={modal.data.sort_order} onChange={handleChange} min={0} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Tagline</label>
                    <input type="text" name="tagline" className="form-control" value={modal.data.tagline} onChange={handleChange} placeholder="Short description shown under the plan name" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Features</label>
                    <FeatureEditor features={modal.data.features} onChange={handleFeatures} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Small Print / Note</label>
                    <input type="text" name="note" className="form-control" value={modal.data.note} onChange={handleChange} placeholder="e.g. Minimum 3-month contract" />
                  </div>
                  <div className="col-12">
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input type="checkbox" name="popular" id="pkg-popular" className="form-check-input" checked={modal.data.popular} onChange={handleChange} />
                        <label className="form-check-label fw-600" htmlFor="pkg-popular" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                          Mark as Popular <small style={{ color: 'var(--color-gray)', fontWeight: 400 }}>(dark highlighted card)</small>
                        </label>
                      </div>
                      <div className="form-check">
                        <input type="checkbox" name="active" id="pkg-active" className="form-check-input" checked={modal.data.active} onChange={handleChange} />
                        <label className="form-check-label fw-600" htmlFor="pkg-active" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Show on website</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid #e5e7eb' }}>
                <button className="btn btn-outline-secondary" onClick={closeModal}>Cancel</button>
                <button
                  className="btn-brand-accent d-flex align-items-center gap-2"
                  style={{ padding: '9px 22px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? <><span className="spinner-border spinner-border-sm"></span> Saving...</> : <><i className="bi bi-check-circle"></i> Save Package</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
