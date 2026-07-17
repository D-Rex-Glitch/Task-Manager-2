import axios from 'axios';

const API_BASE = '/api/tasks';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Intercept errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const getTasks = (filters = {}) => {
  const params = {};
  if (filters.priority && filters.priority !== 'All') params.priority = filters.priority;
  if (filters.status && filters.status !== 'All') params.status = filters.status;
  if (filters.search) params.search = filters.search;
  return api.get('/', { params });
};

export const getTask = (id) => api.get(`/${id}`);

export const createTask = (data) => api.post('/', data);

export const updateTask = (id, data) => api.put(`/${id}`, data);

export const deleteTask = (id) => api.delete(`/${id}`);
