import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const STATUS_META = {
  new:       { color: '#3b82f6', bg: '#eff6ff', label: 'New' },
  contacted: { color: '#f59e0b', bg: '#fffbeb', label: 'Contacted' },
  quoted:    { color: '#f97316', bg: '#fff7ed', label: 'Quoted' },
  converted: { color: '#22c55e', bg: '#f0fdf4', label: 'Converted' },
  closed:    { color: '#9ca3af', bg: '#f9fafb', label: 'Closed' },
};

function toWaNumber(phone = '') {
  const d = phone.replace(/\D/g, '');
  if (d.startsWith('254')) return d;
  if (d.startsWith('0'))   return '254' + d.slice(1);
  return d;
}

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div
        className="rounded-brand p-4 h-100"
        style={{ background: '#fff', boxShadow: 'var(--shadow-sm)', borderTop: `3px solid ${color}` }}
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44, borderRadius: '10px', background: color + '15' }}
          >
            <i className={`bi ${icon}`} style={{ fontSize: '1.25rem', color }}></i>
          </div>
          {sub !== undefined && (
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{sub}</span>
          )}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>{value}</div>
        <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: 6, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/api/admin/dashboard'),
      api.get('/api/admin/leads?limit=5'),
    ])
      .then(([statsRes, leadsRes]) => {
        setStats(statsRes.data.data);
        setRecentLeads(leadsRes.data.data?.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5" style={{ color: 'var(--color-gray)' }}>
        <span className="spinner-border spinner-border-sm me-2"></span>Loading dashboard...
      </div>
    );
  }

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      {/* Greeting */}
      <div className="mb-5">
        <h4 style={{ color: 'var(--color-primary)', fontWeight: 800, margin: 0 }}>
          {greeting} 👋
        </h4>
        <p style={{ color: '#9ca3af', margin: '4px 0 0', fontSize: '0.88rem' }}>
          Here's what's happening with Waterlift Solar today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="row g-4 mb-5">
        <StatCard
          icon="bi-inbox-fill"
          label="Total Leads"
          value={stats?.total_leads ?? '—'}
          color="var(--color-primary)"
          sub="all time"
        />
        <StatCard
          icon="bi-calendar-check"
          label="Leads Today"
          value={stats?.leads_today ?? '—'}
          color="var(--color-accent)"
        />
        <StatCard
          icon="bi-calendar-week"
          label="This Week"
          value={stats?.leads_this_week ?? '—'}
          color="#3b82f6"
        />
        <StatCard
          icon="bi-box-seam"
          label="Active Packages"
          value={stats?.active_packages ?? '—'}
          color="#8b5cf6"
          sub="pricing plans"
        />
      </div>

      <div className="row g-4 mb-4">
        {/* Pipeline */}
        <div className="col-lg-4">
          <div className="rounded-brand p-4 h-100" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 style={{ color: 'var(--color-primary)', fontWeight: 700, margin: 0 }}>Lead Pipeline</h6>
              <Link to="/admin/leads" style={{ color: 'var(--color-accent)', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>
                View all →
              </Link>
            </div>
            {stats?.leads_by_status && Object.keys(STATUS_META).map((status) => {
              const count = stats.leads_by_status[status] || 0;
              const total = Object.values(stats.leads_by_status).reduce((a, b) => a + b, 0) || 1;
              const pct = Math.round((count / total) * 100);
              const meta = STATUS_META[status];
              return (
                <div key={status} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: meta.color, display: 'inline-block', flexShrink: 0 }}></span>
                      <span style={{ fontSize: '0.83rem', color: '#374151', fontWeight: 500 }}>{meta.label}</span>
                    </div>
                    <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--color-primary)' }}>{count}</span>
                  </div>
                  <div style={{ height: 5, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: meta.color, borderRadius: 99, transition: 'width 0.6s ease' }}></div>
                  </div>
                </div>
              );
            })}
            {(!stats?.leads_by_status || Object.keys(stats.leads_by_status).length === 0) && (
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', textAlign: 'center', paddingTop: 12 }}>No lead data yet</p>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="col-lg-4">
          <div className="rounded-brand p-4 h-100" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
            <h6 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: 20 }}>Quick Actions</h6>
            <div className="d-flex flex-column gap-2">
              {[
                { to: '/admin/packages',     icon: 'bi-box-seam',       label: 'Manage Pricing Packages', color: '#8b5cf6', bg: '#f5f3ff' },
                { to: '/admin/leads',        icon: 'bi-inbox',          label: 'View All Leads',          color: 'var(--color-primary)', bg: 'rgba(38,33,97,0.06)' },
                { to: '/admin/testimonials', icon: 'bi-chat-quote',     label: 'Add Testimonial',         color: 'var(--color-accent)', bg: 'rgba(243,163,120,0.1)' },
                { to: '/admin/faqs',         icon: 'bi-question-circle',label: 'Manage FAQs',             color: '#3b82f6', bg: '#eff6ff' },
                { to: '/admin/settings',     icon: 'bi-gear',           label: 'Site Settings',           color: '#22c55e', bg: '#f0fdf4' },
              ].map(({ to, icon, label, color, bg }) => (
                <Link
                  key={to}
                  to={to}
                  className="d-flex align-items-center gap-3 p-3 rounded text-decoration-none"
                  style={{ background: bg, transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 34, height: 34, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                  >
                    <i className={`bi ${icon}`} style={{ color, fontSize: '1rem' }}></i>
                  </div>
                  <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.88rem' }}>{label}</span>
                  <i className="bi bi-chevron-right ms-auto" style={{ color: '#d1d5db', fontSize: '0.78rem' }}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="col-lg-4">
          <div className="rounded-brand p-4 h-100" style={{ background: 'linear-gradient(160deg, var(--color-primary) 0%, #1a1745 100%)', boxShadow: 'var(--shadow-sm)' }}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: 20 }}>Content Overview</h6>
            {[
              { icon: 'bi-box-seam',       label: 'Active Packages',     value: stats?.active_packages     ?? 0, color: '#a78bfa' },
              { icon: 'bi-question-circle',label: 'Active FAQs',         value: stats?.active_faqs         ?? 0, color: 'var(--color-accent)' },
              { icon: 'bi-chat-quote',     label: 'Active Testimonials', value: stats?.active_testimonials ?? 0, color: '#34d399' },
            ].map(({ icon, label, value, color }) => (
              <div key={label} className="d-flex align-items-center justify-content-between p-3 rounded mb-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="d-flex align-items-center gap-3">
                  <i className={`bi ${icon}`} style={{ color, fontSize: '1.1rem' }}></i>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>{label}</span>
                </div>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>{value}</span>
              </div>
            ))}
            <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', margin: 0 }}>
                Waterlift Solar Savings Admin Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent leads table */}
      <div className="rounded-brand" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div className="d-flex align-items-center justify-content-between px-4 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
          <h6 style={{ color: 'var(--color-primary)', fontWeight: 700, margin: 0 }}>
            <i className="bi bi-clock-history me-2" style={{ color: 'var(--color-accent)' }}></i>
            Recent Leads
          </h6>
          <Link to="/admin/leads" style={{ color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            View all leads →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox d-block mb-2" style={{ fontSize: '2rem', color: '#e5e7eb' }}></i>
            <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.88rem' }}>
              No leads yet — they'll appear here when schools submit the contact form.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ fontSize: '0.88rem' }}>
              <thead style={{ background: '#fafafa' }}>
                <tr style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <th className="ps-4" style={{ fontWeight: 600 }}>School</th>
                  <th style={{ fontWeight: 600 }}>Contact</th>
                  <th style={{ fontWeight: 600 }}>Actions</th>
                  <th style={{ fontWeight: 600 }}>Status</th>
                  <th style={{ fontWeight: 600 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => {
                  const meta = STATUS_META[lead.status] || STATUS_META.new;
                  const waNum = toWaNumber(lead.phone || '');
                  const waMsg = encodeURIComponent(`Hello ${lead.contact_name}, this is Waterlift Solar Savings. We'd love to discuss your school energy audit for ${lead.school_name}.`);
                  return (
                    <tr key={lead.id} style={{ borderTop: '1px solid #f9fafb' }}>
                      <td className="ps-4">
                        <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{lead.school_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{lead.county || '—'}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{lead.contact_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{lead.phone}</div>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <a
                            href={`https://wa.me/${waNum}?text=${waMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-inline-flex align-items-center gap-1"
                            style={{ background: '#dcfce7', color: '#16a34a', textDecoration: 'none', padding: '4px 10px', borderRadius: 5, fontSize: '0.78rem', fontWeight: 600 }}
                          >
                            <i className="bi bi-whatsapp"></i> WhatsApp
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="d-inline-flex align-items-center gap-1"
                              style={{ background: '#eff6ff', color: '#3b82f6', textDecoration: 'none', padding: '4px 10px', borderRadius: 5, fontSize: '0.78rem', fontWeight: 600 }}
                            >
                              <i className="bi bi-envelope"></i>
                            </a>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            background: meta.bg, color: meta.color,
                            padding: '3px 10px', borderRadius: 50,
                            fontSize: '0.75rem', fontWeight: 700,
                          }}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                        {new Date(lead.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
