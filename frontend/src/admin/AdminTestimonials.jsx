import { useState, useEffect } from 'react';
import api from '../utils/api';

const EMPTY = { author_name: '', school_name: '', quote: '', rating: 5 };

function Stars({ rating }) {
  return [1,2,3,4,5].map((s) => (
    <i key={s} className={`bi ${s <= rating ? 'bi-star-fill' : 'bi-star'}`} style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}></i>
  ));
}

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', data: {} }
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch = () => {
    setLoading(true);
    api.get('/api/admin/testimonials').then((r) => setItems(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY } });
  const openEdit = (item) => setModal({ mode: 'edit', data: { ...item } });
  const closeModal = () => { setModal(null); setError(''); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModal((m) => ({ ...m, data: { ...m.data, [name]: name === 'rating' ? parseInt(value) : value } }));
  };

  const handleSave = async () => {
    const { mode, data } = modal;
    if (!data.author_name || !data.quote) { setError('Author name and quote are required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (mode === 'add') await api.post('/api/admin/testimonials', data);
      else await api.put(`/api/admin/testimonials/${data.id}`, data);
      closeModal();
      fetch();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    api.delete(`/api/admin/testimonials/${id}`).then(fetch).catch(() => alert('Delete failed'));
  };

  const toggleActive = (id) => {
    api.patch(`/api/admin/testimonials/${id}/toggle`).then(fetch).catch(() => alert('Toggle failed'));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ color: 'var(--color-gray)', fontSize: '0.88rem' }}>{items.length} testimonial{items.length !== 1 ? 's' : ''}</span>
        <button className="btn-brand-accent" style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }} onClick={openAdd}>
          <i className="bi bi-plus me-1"></i>Add Testimonial
        </button>
      </div>

      <div className="rounded-brand" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        {loading ? (
          <div className="text-center py-5" style={{ color: 'var(--color-gray)' }}><span className="spinner-border spinner-border-sm me-2"></span>Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: '#f9fafb' }}>
                <tr style={{ fontSize: '0.78rem', color: 'var(--color-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th>Author</th><th>School</th><th>Quote</th><th>Rating</th><th>Active</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-4" style={{ color: 'var(--color-gray)' }}>No testimonials yet.</td></tr>
                ) : items.map((t) => (
                  <tr key={t.id} style={{ fontSize: '0.88rem' }}>
                    <td className="fw-600" style={{ fontWeight: 600 }}>{t.author_name}</td>
                    <td style={{ color: 'var(--color-gray)' }}>{t.school_name || '—'}</td>
                    <td style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.quote}</td>
                    <td><Stars rating={t.rating} /></td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{ padding: '2px 10px', fontSize: '0.78rem', background: t.active ? '#dcfce7' : '#f3f4f6', color: t.active ? '#16a34a' : '#9ca3af', border: 'none', borderRadius: 20 }}
                        onClick={() => toggleActive(t.id)}
                      >
                        {t.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => openEdit(t)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.45)' }} role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-brand" style={{ border: 'none' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb' }}>
                <h5 className="modal-title fw-700" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                  {modal.mode === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem' }}>{error}</div>}
                <div className="mb-3">
                  <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Author Name *</label>
                  <input type="text" name="author_name" className="form-control" value={modal.data.author_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>School Name</label>
                  <input type="text" name="school_name" className="form-control" value={modal.data.school_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Quote *</label>
                  <textarea name="quote" className="form-control" rows={4} value={modal.data.quote} onChange={handleChange} />
                </div>
                <div className="mb-0">
                  <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Rating</label>
                  <select name="rating" className="form-select" value={modal.data.rating} onChange={handleChange}>
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid #e5e7eb' }}>
                <button className="btn btn-outline-secondary" onClick={closeModal}>Cancel</button>
                <button
                  className="btn-brand-accent"
                  style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  onClick={handleSave} disabled={saving}
                >
                  {saving ? <><span className="spinner-border spinner-border-sm me-1"></span>Saving...</> : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
