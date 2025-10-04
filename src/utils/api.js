const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  async request(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    if (options.body && !(options.body instanceof FormData)) {
      config.body = JSON.stringify(options.body);
    } else if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    const response = await fetch(`${API_BASE_URL}${url}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  get(url) {
    return this.request(url);
  },

  post(url, body) {
    return this.request(url, { method: 'POST', body });
  },

  put(url, body) {
    return this.request(url, { method: 'PUT', body });
  },

  delete(url) {
    return this.request(url, { method: 'DELETE' });
  },
};

export default api;