import { useState, useEffect } from 'react';
import api from '../utils/api';

const EMPTY = { question: '', answer: '', sort_order: 0, active: true };

export default function AdminFaqs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch = () => {
    setLoading(true);
    api.get('/api/admin/faqs').then((r) => setItems(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => setModal({ mode: 'add', data: { ...EMPTY } });
  const openEdit = (item) => setModal({ mode: 'edit', data: { ...item, active: Boolean(item.active) } });
  const closeModal = () => { setModal(null); setError(''); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModal((m) => ({ ...m, data: { ...m.data, [name]: type === 'checkbox' ? checked : name === 'sort_order' ? parseInt(value) || 0 : value } }));
  };

  const handleSave = async () => {
    const { mode, data } = modal;
    if (!data.question || !data.answer) { setError('Question and answer are required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (mode === 'add') await api.post('/api/admin/faqs', data);
      else await api.put(`/api/admin/faqs/${data.id}`, data);
      closeModal();
      fetch();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save.');
    } finally { setSaving(false); }
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this FAQ?')) return;
    api.delete(`/api/admin/faqs/${id}`).then(fetch).catch(() => alert('Delete failed'));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ color: 'var(--color-gray)', fontSize: '0.88rem' }}>{items.length} FAQ{items.length !== 1 ? 's' : ''}</span>
        <button className="btn-brand-accent" style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }} onClick={openAdd}>
          <i className="bi bi-plus me-1"></i>Add FAQ
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
                  <th>Order</th><th>Question</th><th>Answer</th><th>Active</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-4" style={{ color: 'var(--color-gray)' }}>No FAQs yet.</td></tr>
                ) : items.map((faq) => (
                  <tr key={faq.id} style={{ fontSize: '0.88rem' }}>
                    <td style={{ color: 'var(--color-gray)', fontWeight: 700, width: 60 }}>{faq.sort_order}</td>
                    <td style={{ maxWidth: 280, fontWeight: 600 }}>{faq.question}</td>
                    <td style={{ maxWidth: 320, color: 'var(--color-gray)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{faq.answer}</td>
                    <td>
                      <span style={{ padding: '2px 10px', fontSize: '0.78rem', background: faq.active ? '#dcfce7' : '#f3f4f6', color: faq.active ? '#16a34a' : '#9ca3af', borderRadius: 20 }}>
                        {faq.active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => openEdit(faq)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(faq.id)}><i className="bi bi-trash"></i></button>
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
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-brand" style={{ border: 'none' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb' }}>
                <h5 className="modal-title fw-700" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                  {modal.mode === 'add' ? 'Add FAQ' : 'Edit FAQ'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem' }}>{error}</div>}
                <div className="mb-3">
                  <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Question *</label>
                  <input type="text" name="question" className="form-control" value={modal.data.question} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Answer *</label>
                  <textarea name="answer" className="form-control" rows={5} value={modal.data.answer} onChange={handleChange} />
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Sort Order</label>
                    <input type="number" name="sort_order" className="form-control" value={modal.data.sort_order} onChange={handleChange} min={0} />
                    <div className="form-text">Lower number = appears first</div>
                  </div>
                  <div className="col-md-4 d-flex align-items-end pb-1">
                    <div className="form-check">
                      <input type="checkbox" name="active" id="faq-active" className="form-check-input" checked={modal.data.active} onChange={handleChange} />
                      <label className="form-check-label fw-600" htmlFor="faq-active" style={{ fontWeight: 600, fontSize: '0.88rem' }}>Show on website</label>
                    </div>
                  </div>
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
