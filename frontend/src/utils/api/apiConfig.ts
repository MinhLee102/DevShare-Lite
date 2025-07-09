import axios from "axios" 

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('access_token');

      if ( accessToken && !config.url?.includes('/auth/login') &&
        !config.url?.includes('/auth/registration') ) 
        {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;