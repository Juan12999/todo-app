import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('session-data')||"{}").token||""}`,
  },
});

export default api;