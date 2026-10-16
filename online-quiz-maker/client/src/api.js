import axios from 'axios';
import { demoRequest } from './demo-store';

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

let api;

if (DEMO_MODE) {
  api = {
    get: (path) => demoRequest('GET', path),
    post: (path, body) => demoRequest('POST', path, body),
    put: (path, body) => demoRequest('PUT', path, body),
    delete: (path) => demoRequest('DELETE', path),
  };
} else {
  api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('quiz-token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

export default api;
