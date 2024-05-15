import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://13.210.239.98:8080",
});

export default axiosInstance;
