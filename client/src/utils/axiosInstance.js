

import axios from "axios";
import {BASE_URL} from "../constant";

axios.defaults.withCredentials = true;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const MAX_RETRIES = 4;

axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    let endPoint = "/auth/refresh";
    if (originalRequest.url?.includes(endPoint)) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (error.response?.status === 401 && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retryCount += 1; // Increment the retry counter

      try {
        const { data } = await axiosInstance.get(`/auth/refresh`, {
          withCredentials: true, // Ensure cookies are sent
        });

        const newAccessToken = data?.accessToken;
        localStorage.setItem("authToken", newAccessToken);

        if (newAccessToken) {
          // Update the Authorization header with the new token
          axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed, logging out.");
        return Promise.reject(refreshError);
      }
    }

    // If the retry limit is reached or another error occurs, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;