import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
       // Handle unauthorized access
       localStorage.removeItem('userId');
       localStorage.removeItem('username');
    }
    return Promise.reject(error);
  }
);

export default apiClient;

