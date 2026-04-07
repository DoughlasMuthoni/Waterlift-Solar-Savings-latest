import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../utils/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get('session') === 'expired';
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('Both fields are required.'); return; }

    setStatus('loading');
    setError('');

    try {
      const res = await api.post('/api/auth/login', form);
      const { token, admin } = res.data.data;
      localStorage.setItem('waterlift_admin_token', token);
      localStorage.setItem('waterlift_admin_user', JSON.stringify(admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setStatus('idle');
      const msg = err.response?.data?.message
        || (err.code === 'ERR_NETWORK' || !err.response ? 'Cannot reach the server. Make sure the backend is running.' : 'Invalid credentials. Please try again.');
      setError(msg);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9ff 0%, #e8eaf6 100%)' }}
    >
      <div style={{ width: '100%', maxWidth: 420, padding: '0 16px' }}>
        {/* Logo */}
        <div className="text-center mb-5">
          <div className="fw-800 mb-2" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            WATERLIFT<span style={{ color: 'var(--color-accent)' }}>.</span>SOLAR
          </div>
          <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>Admin Portal</p>
        </div>

        <div className="rounded-brand p-4 p-md-5" style={{ background: '#fff', boxShadow: 'var(--shadow-lg)' }}>
          <h4 className="fw-700 mb-4" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Sign In</h4>

          {sessionExpired && (
            <div className="alert alert-warning py-2 mb-4" role="alert" style={{ fontSize: '0.88rem' }}>
              <i className="bi bi-clock-history me-2"></i>Your session has expired. Please sign in again.
            </div>
          )}

          {error && (
            <div className="alert alert-danger py-2 mb-4" role="alert" style={{ fontSize: '0.88rem' }}>
              <i className="bi bi-exclamation-circle me-2"></i>{error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Username</label>
              <input
                type="text" name="username" className="form-control"
                value={form.username} onChange={handleChange}
                placeholder="admin" autoComplete="username" autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-600" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'} name="password"
                  className="form-control" value={form.password} onChange={handleChange}
                  placeholder="••••••••" autoComplete="current-password"
                />
                <button
                  type="button" className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderColor: '#dee2e6' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-brand-primary w-100 d-flex align-items-center justify-content-center gap-2"
              style={{ padding: '12px', borderRadius: '8px', fontSize: '0.95rem', cursor: 'pointer', border: 'none' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...</>
              ) : (
                <><i className="bi bi-box-arrow-in-right"></i> Sign In</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-4" style={{ color: 'var(--color-gray)', fontSize: '0.8rem' }}>
          <a href="/" style={{ color: 'var(--color-primary)' }}>← Back to website</a>
        </p>
      </div>
    </div>
  );
}
