import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me')
};

export const foodAPI = {
  getAll: (params) => API.get('/foods', { params }),
  getById: (id) => API.get(`/foods/${id}`),
  create: (data) => API.post('/foods', data),
  update: (id, data) => API.put(`/foods/${id}`, data),
  delete: (id) => API.delete(`/foods/${id}`)
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/my-orders'),
  getAllOrders: () => API.get('/orders/all'),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status })
};

export default API;