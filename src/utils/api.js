// Dynamic API base URL:
// In development, talks to local Express server on port 5000.
// In production on Vercel, uses relative path (same domain).
export const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.DEV ? 'http://localhost:5000' : '');
