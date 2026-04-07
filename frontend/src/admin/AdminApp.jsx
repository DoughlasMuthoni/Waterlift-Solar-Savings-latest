import { Routes, Route, Navigate, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminLeads from './AdminLeads';
import AdminTestimonials from './AdminTestimonials';
import AdminFaqs from './AdminFaqs';
import AdminSettings from './AdminSettings';
import AdminPackages from './AdminPackages';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('waterlift_admin_token');
  return token ? children : <Navigate to="/admin/login" replace />;
}

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('waterlift_admin_user') || '{}'); }
    catch { return {}; }
  })();

  const logout = () => {
    localStorage.removeItem('waterlift_admin_token');
    localStorage.removeItem('waterlift_admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard',    icon: 'bi-speedometer2',  label: 'Dashboard' },
    { to: '/admin/leads',        icon: 'bi-inbox',         label: 'Leads' },
    { to: '/admin/packages',     icon: 'bi-box-seam',      label: 'Packages' },
    { to: '/admin/testimonials', icon: 'bi-chat-quote',    label: 'Testimonials' },
    { to: '/admin/faqs',         icon: 'bi-question-circle', label: 'FAQs' },
    { to: '/admin/settings',     icon: 'bi-gear',          label: 'Settings' },
  ];

  const pageTitles = {
    '/admin/dashboard':    'Dashboard',
    '/admin/leads':        'Lead Submissions',
    '/admin/packages':     'Pricing Packages',
    '/admin/testimonials': 'Testimonials',
    '/admin/faqs':         'FAQ Management',
    '/admin/settings':     'Site Settings',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-stack)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: 'var(--color-primary)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          transition: 'transform 0.3s ease',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 200,
          transform: sidebarOpen ? 'translateX(0)' : undefined,
        }}
        className={`d-none d-lg-flex flex-column`}
      >
        {/* Logo */}
        <div className="p-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="fw-800 text-white" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
            WATERLIFT<span style={{ color: 'var(--color-accent)' }}>.</span>SOLAR
          </div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: 2 }}>Admin Portal</div>
        </div>

        {/* Nav */}
        <nav className="p-3 flex-grow-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="d-flex align-items-center gap-3 rounded-brand mb-1 px-3 py-2 text-decoration-none"
                style={{
                  color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                  background: active ? 'var(--color-accent)' : 'transparent',
                  fontWeight: active ? 700 : 400,
                  fontSize: '0.9rem',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: '1rem' }}></i>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="mb-3 px-3">
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logged in as</div>
            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{user.username || 'Admin'}</div>
          </div>
          <button
            onClick={logout}
            className="d-flex align-items-center gap-2 w-100 rounded-brand px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.88rem', transition: 'var(--transition)' }}
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ marginLeft: 240, flex: 1, background: '#f4f5f9', minHeight: '100vh' }} className="d-none d-lg-block">
        {/* Top bar */}
        <header
          className="d-flex align-items-center justify-content-between px-4 py-3"
          style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100 }}
        >
          <h5 className="mb-0 fw-700" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
            {pageTitles[location.pathname] || 'Admin'}
          </h5>
          <a href="/" target="_blank" className="btn-brand-primary text-decoration-none" style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '0.82rem' }}>
            <i className="bi bi-box-arrow-up-right me-1"></i>View Site
          </a>
        </header>

        <div className="p-4">{children}</div>
      </div>

      {/* Mobile fallback */}
      <div className="d-lg-none p-4 flex-grow-1">
        <div className="alert alert-info">
          Please use a desktop browser for the admin dashboard.
        </div>
        <button onClick={logout} className="btn btn-outline-danger">Logout</button>
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard"    element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="leads"        element={<ProtectedRoute><AdminLayout><AdminLeads /></AdminLayout></ProtectedRoute>} />
      <Route path="packages"     element={<ProtectedRoute><AdminLayout><AdminPackages /></AdminLayout></ProtectedRoute>} />
      <Route path="testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
      <Route path="faqs"         element={<ProtectedRoute><AdminLayout><AdminFaqs /></AdminLayout></ProtectedRoute>} />
      <Route path="settings"     element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}
