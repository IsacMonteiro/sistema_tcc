import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL do backend
  timeout: 5000, // Tempo limite para requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;