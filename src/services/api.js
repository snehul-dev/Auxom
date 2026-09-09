import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7113/api",
});

const refreshAPI = axios.create({
  baseURL: "https://localhost:7113/api",
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


API.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");

          return Promise.reject(error);
        }

        const response = await refreshAPI.post(
          "/auth/refresh",
          {
            refreshToken: refreshToken,
          }
        );

        const newAccessToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;


        return API(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;