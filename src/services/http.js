import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("no token available");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((res) => {
  return res;
});

export default axiosInstance;
