import axios from 'axios';
import config from '../config/env.config';

const api = axios.create({
    baseURL: config.API_URL,
});

// 👇 Este interceptor se ejecuta ANTES de cada petición.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Si hay un token, lo añade a la cabecera de autorización.
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;