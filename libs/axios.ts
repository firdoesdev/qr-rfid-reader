import axios from "axios";
import { API_URL } from "@/constants/Configs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem("accessToken");

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx
    return Promise.reject(error);
  }
);

export default axiosInstance;
