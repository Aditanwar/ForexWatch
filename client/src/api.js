import axios from 'axios';

// In production (Vercel), API is on same domain at /api
// In local dev, it runs on port 5000
const baseURL = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
    baseURL: baseURL,
});

// Interceptor to add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
