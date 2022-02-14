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
    console.log(`${JSON.stringify(config, null, 2)}`);
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((res) => {
  console.log(res);
  console.log("response from axios interceptors **************************");
  return res;
});

export default axiosInstance;
