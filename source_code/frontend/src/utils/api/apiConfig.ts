import axios, { AxiosError } from 'axios';

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
  (error) => { Promise.reject(error); }
);

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void; }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest.url?.includes('/token/refresh/')) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        console.error("No refresh token available. Logging out.");
        window.location.href = '/login';
        return Promise.reject(error);
      }

            try {
        const rs = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
          refresh: refreshToken
        });

        const { access } = rs.data;
        localStorage.setItem('access_token', access);
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + access;
        originalRequest.headers['Authorization'] = 'Bearer ' + access;
        
        processQueue(null, access); 
        return apiClient(originalRequest); 
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error("Refresh token failed. Logging out.");
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;