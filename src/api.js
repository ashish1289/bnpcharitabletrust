const API_BASE_URL = import.meta.env.PROD ? 'https://app.bnptrust.in/api' : 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || response.statusText || 'API request failed');
  }

  return data;
};

const api = {
  login: (body) => request('/auth/login', { method: 'POST', body }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getCurrentUser: () => request('/auth/me'),
  getApplications: () => request('/scholarships'),
  updateApplicationStatus: (id, body) => request(`/scholarships/${id}/status`, { method: 'PUT', body }),
  submitScholarship: (body) => request('/scholarships', { method: 'POST', body }),
};

export default api;
