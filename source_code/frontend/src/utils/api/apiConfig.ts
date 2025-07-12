import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * Request Interceptor:
 * This runs before every request is sent. Its purpose is to automatically attach the
 * JWT access token to the `Authorization` header if it exists in localStorage.
 */
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


// Handling token refresh
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


/**
 * Response Interceptor:
 * This runs after a response is received. It checks for 401 Unauthorized errors,
 * which typically indicate an expired access token. If so, it attempts to
 * refresh the token and then retries the original failed request.
 */
apiClient.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Intercept only 401 errors that are not from a failed token refresh attempt.
    if (error.response?.status === 401 && originalRequest && !originalRequest.url?.includes('/token/refresh/')) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue the failed request.
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
        // No refresh token, redirect to login
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

        // Update the default header for subsequent requests.
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