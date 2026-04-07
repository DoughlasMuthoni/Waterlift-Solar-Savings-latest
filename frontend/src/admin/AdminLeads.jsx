import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const STATUS_OPTIONS = ['new', 'contacted', 'quoted', 'converted', 'closed'];
const STATUS_META = {
  new:       { color: '#3b82f6', bg: '#eff6ff', label: 'New' },
  contacted: { color: '#f59e0b', bg: '#fffbeb', label: 'Contacted' },
  quoted:    { color: '#f97316', bg: '#fff7ed', label: 'Quoted' },
  converted: { color: '#22c55e', bg: '#f0fdf4', label: 'Converted' },
  closed:    { color: '#9ca3af', bg: '#f9fafb', label: 'Closed' },
};

const SCHOOL_TYPE_LABELS = {
  private_day:      'Private Day',
  private_boarding: 'Private Boarding',
  public_day:       'Public Day',
  public_boarding:  'Public Boarding',
  primary:          'Primary',
  secondary:        'Secondary',
  boarding:         'Boarding',
  other:            'Other',
};

// Format phone to WhatsApp international format (digits only, strip leading 0, add 254)
function toWaNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0'))   return '254' + digits.slice(1);
  if (digits.startsWith('7') || digits.startsWith('1')) return '254' + digits;
  return digits;
}

function ContactActions({ lead }) {
  const waNum = toWaNumber(lead.phone || '');
  const waMsg = encodeURIComponent(
    `Hello ${lead.contact_name}, this is Waterlift Solar Savings regarding your school energy audit enquiry for ${lead.school_name}. We'd love to discuss how we can help cut your electricity bills by up to 60%. When would be a good time to talk?`
  );
  const emailSubject = encodeURIComponent(`Your Waterlift Solar Enquiry — ${lead.school_name}`);
  const emailBody = encodeURIComponent(
    `Dear ${lead.contact_name},\n\nThank you for your interest in Waterlift Solar Savings for ${lead.school_name}.\n\nWe would love to schedule a free school energy audit at a time convenient for you.\n\nKind regards,\nWaterlift Solar Savings Team`
  );

  return (
    <div className="d-flex gap-2 flex-wrap">
      <a
        href={`https://wa.me/${waNum}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="d-inline-flex align-items-center gap-1"
        style={{
          background: '#dcfce7', color: '#16a34a', textDecoration: 'none',
          padding: '5px 12px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        <i className="bi bi-whatsapp" style={{ fontSize: '0.9rem' }}></i>
        WhatsApp
      </a>
      {lead.email && (
        <a
          href={`mailto:${lead.email}?subject=${emailSubject}&body=${emailBody}`}
          title="Send Email"
          className="d-inline-flex align-items-center gap-1"
          style={{
            background: '#eff6ff', color: '#3b82f6', textDecoration: 'none',
            padding: '5px 12px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <i className="bi bi-envelope" style={{ fontSize: '0.9rem' }}></i>
          Email
        </a>
      )}
      <a
        href={`tel:${lead.phone}`}
        title="Call"
        className="d-inline-flex align-items-center gap-1"
        style={{
          background: '#f0fdf4', color: '#15803d', textDecoration: 'none',
          padding: '5px 10px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        <i className="bi bi-telephone" style={{ fontSize: '0.9rem' }}></i>
      </a>
    </div>
  );
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 20;

  const fetchLeads = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: perPage });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    api.get(`/api/admin/leads?${params}`)
      .then((res) => {
        setLeads(res.data.data?.data || []);
        setTotal(res.data.data?.total || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, statusFilter, page]);

  useEffect(() => {
    const t = setTimeout(fetchLeads, 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  const updateStatus = (id, status) => {
    api.patch(`/api/admin/leads/${id}/status`, { status })
      .then(() => setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l)))
      .catch(() => alert('Failed to update status'));
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      {/* Filters bar */}
      <div
        className="rounded-brand p-3 mb-4 d-flex flex-wrap gap-3 align-items-center"
        style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="position-relative flex-grow-1" style={{ maxWidth: 320 }}>
          <i className="bi bi-search position-absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.88rem' }}></i>
          <input
            type="text"
            className="form-control ps-4"
            style={{ fontSize: '0.88rem' }}
            placeholder="Search school or contact name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="form-select"
          style={{ maxWidth: 180, fontSize: '0.88rem' }}
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="text-capitalize">{STATUS_META[s]?.label || s}</option>
          ))}
        </select>
        <div className="ms-auto d-flex align-items-center gap-2">
          <span
            className="px-3 py-1 rounded-pill"
            style={{ background: 'rgba(38,33,97,0.07)', color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 700 }}
          >
            {total} lead{total !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-brand" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        {loading ? (
          <div className="text-center py-5" style={{ color: 'var(--color-gray)' }}>
            <span className="spinner-border spinner-border-sm me-2"></span>Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox d-block mb-3" style={{ fontSize: '2.5rem', color: '#d1d5db' }}></i>
            <p style={{ color: 'var(--color-gray)', margin: 0 }}>
              {search || statusFilter ? 'No leads match your filters.' : 'No leads yet. Leads from the contact form will appear here.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ minWidth: 800 }}>
              <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <th className="ps-4" style={{ width: 40, fontWeight: 600 }}>#</th>
                  <th style={{ fontWeight: 600 }}>School</th>
                  <th style={{ fontWeight: 600 }}>Contact</th>
                  <th style={{ fontWeight: 600 }}>Contact Actions</th>
                  <th style={{ fontWeight: 600 }}>Status</th>
                  <th style={{ fontWeight: 600 }}>Date</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const meta = STATUS_META[lead.status] || STATUS_META.new;
                  const isExpanded = expandedId === lead.id;
                  return (
                    <>
                      <tr
                        key={lead.id}
                        style={{ fontSize: '0.88rem', cursor: 'pointer', transition: 'background 0.15s' }}
                        className={isExpanded ? '' : ''}
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.background = '#fafafa'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                      >
                        <td className="ps-4" style={{ color: '#9ca3af', fontWeight: 600, width: 40 }}>{lead.id}</td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.3 }}>{lead.school_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
                            {SCHOOL_TYPE_LABELS[lead.school_type] || lead.school_type}
                            {lead.county ? ` · ${lead.county}` : ''}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{lead.contact_name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{lead.phone}</div>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <ContactActions lead={lead} />
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <select
                            className="form-select form-select-sm"
                            style={{
                              fontSize: '0.78rem',
                              width: 'auto',
                              minWidth: 120,
                              fontWeight: 600,
                              background: meta.bg,
                              color: meta.color,
                              border: `1px solid ${meta.color}40`,
                              borderRadius: 6,
                            }}
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{STATUS_META[s]?.label || s}</option>
                            ))}
                          </select>
                        </td>
                        <td style={{ color: '#9ca3af', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                          {new Date(lead.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td>
                          <i
                            className={`bi ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'}`}
                            style={{ color: '#d1d5db', fontSize: '0.85rem' }}
                          ></i>
                        </td>
                      </tr>

                      {/* Expanded detail row */}
                      {isExpanded && (
                        <tr key={`${lead.id}-exp`} style={{ background: '#f8f9ff' }}>
                          <td colSpan={7} className="px-4 py-4">
                            <div className="row g-3">
                              <div className="col-md-3 col-6">
                                <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Email</div>
                                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                                  {lead.email ? (
                                    <a href={`mailto:${lead.email}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>{lead.email}</a>
                                  ) : '—'}
                                </div>
                              </div>
                              <div className="col-md-3 col-6">
                                <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Students</div>
                                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{lead.num_students || '—'}</div>
                              </div>
                              <div className="col-md-3 col-6">
                                <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Monthly Bill (KES)</div>
                                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                                  {lead.monthly_bill ? `KES ${Number(lead.monthly_bill).toLocaleString()}` : '—'}
                                </div>
                              </div>
                              <div className="col-md-3 col-6">
                                <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Preferred Plan</div>
                                <div style={{ fontWeight: 600, fontSize: '0.88rem', textTransform: 'capitalize' }}>
                                  {lead.preferred_plan ? lead.preferred_plan.replace(/_/g, ' ') : 'Not specified'}
                                </div>
                              </div>
                              {lead.message && (
                                <div className="col-12">
                                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Message</div>
                                  <div
                                    className="p-3 rounded"
                                    style={{ background: '#fff', border: '1px solid #e5e7eb', fontSize: '0.88rem', color: '#374151', lineHeight: 1.65 }}
                                  >
                                    {lead.message}
                                  </div>
                                </div>
                              )}
                              <div className="col-12 pt-1">
                                <ContactActions lead={lead} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span style={{ color: 'var(--color-gray)', fontSize: '0.82rem' }}>
            Showing {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} of {total}
          </span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <span
              className="d-flex align-items-center px-3"
              style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}
            >
              {page} / {totalPages}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
