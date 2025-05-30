import axios from "axios";

const baseURL = "https://article-post-backend.vercel.app/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true, // Include credentials (cookies) in requests
});

// Define public routes that don't need authentication
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/article/published-articles"
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

    // Only proceed if it's a 401 error and not a public route
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isPublicRoute(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    // Mark this request as retried
    originalRequest._retry = true;

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    isRefreshing = true;

    try {
      // Attempt to refresh the token
      await api.get("/auth/refresh");

      processQueue(null);

      return api(originalRequest);
    } catch (refreshError) {
      // If refresh fails, clear all pending requests
      processQueue(refreshError);

      // Clear auth state (e.g., Redux, Context)
      // Example: store.dispatch({ type: 'LOGOUT' });
      // store.dispatch(clearAuthState());
      import("../redux/store").then(({ store }) => {
        import("../redux/slices/authSlice").then(({ clearAuthState }) => {
          store.dispatch(clearAuthState());
        });
      });
      return Promise.reject(refreshError);
    } finally {
      // Always reset isRefreshing to prevent deadlocks
      isRefreshing = false;
    }
  }
);

export default api;
