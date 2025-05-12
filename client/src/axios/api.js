import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true, // Include credentials (cookies) in requests
});

// Define public routes that don't need authentication
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  // Add other public endpoints as needed
];

// Helper function to check if a URL belongs to a public route
const isPublicRoute = (url) => {
  return publicRoutes.some((route) => url.includes(route));
};

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

    // Skip refresh token logic if:
    // 1. Not a 401 error
    // 2. Already tried refreshing for this request
    // 3. It's the refresh token endpoint itself
    // 4. It's a public route (don't trigger refresh for public endpoints)
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url === "/auth/refresh" ||
      isPublicRoute(originalRequest.url)
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
