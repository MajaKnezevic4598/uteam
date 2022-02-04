import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
