const API_BASE_URL = import.meta.env.PROD ? 'https://app.bnptrust.in/api' : 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = { ...options.headers };
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers,
      method: options.method || 'GET',
      body: isFormData ? options.body : (options.body ? JSON.stringify(options.body) : undefined),
    });
  } catch (error) {
    // Network error (server completely down)
    window.location.href = '/maintenance';
    throw new Error('Server unreachable');
  }

  // 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout
  if ([502, 503, 504].includes(response.status)) {
    window.location.href = '/maintenance';
    throw new Error('Server maintenance');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || response.statusText || 'API request failed');
  }

  return data;
};

const api = {
  login: (body) => request('/auth/login', { method: 'POST', body }),
  register: (body) => request('/auth/register', { method: 'POST', body }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getCurrentUser: () => request('/auth/me'),
  getApplications: (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.course) query.append('course', params.course);
    if (params.isEligible !== undefined) query.append('isEligible', params.isEligible);
    return request(`/scholarships?${query.toString()}`);
  },
  getScholarshipStats: (params = {}) => {
    const query = new URLSearchParams();
    if (params.isEligible !== undefined) query.append('isEligible', params.isEligible);
    return request(`/scholarships/stats?${query.toString()}`);
  },
  getUniqueCourses: () => request('/scholarships/courses'),
  getMyApplications: () => request('/scholarships/my-applications'),
  getApplication: (id) => request(`/scholarships/${id}`),
  updateApplicationStatus: (id, body) => request(`/scholarships/${id}/status`, { method: 'PUT', body }),
  submitScholarship: (body) => request('/scholarships', { method: 'POST', body }),
  updateApplication: (id, body) => request(`/scholarships/${id}`, { method: 'PUT', body }),
  getSettings: () => request('/settings'),
  updateSettings: (body) => request('/settings', { method: 'PUT', body })
};

export default api;
