import axios from 'axios';

// Empty baseURL = relative paths → Vite proxy forwards /api/* to PHP server in dev
// Set VITE_API_URL to your production API URL for production builds
const baseURL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('waterlift_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401: clears stale/expired token and redirects to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname.startsWith('/admin') &&
      !window.location.pathname.endsWith('/login')
    ) {
      localStorage.removeItem('waterlift_admin_token');
      localStorage.removeItem('waterlift_admin_user');
      window.location.href = '/admin/login?session=expired';
    }
    return Promise.reject(error);
  }
);

export default api;
