import axios from "axios";

const baseURL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true, // Include credentials (cookies) in requests
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip retry if not 401, already retried, or refresh endpoint
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url === "/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    //
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch((error) => {
          Promise.reject(error);
        });
    }

    isRefreshing = true;

    try {
      await api.get("/auth/refresh");

      processQueue(null);

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      // Clear auth state (e.g., Redux, Context)
      // Example: store.dispatch({ type: 'LOGOUT' });

      window.location.href = "/login"; // Redirect to login page
      return Promise.reject(refreshError);
    } finally {
      // Always reset isRefreshing to prevent deadlocks
      isRefreshing = false;
    }
  }
);

export default api;
