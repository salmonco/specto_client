import axios, { AxiosInstance } from "axios";
import getEnvVars from "environment";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getEnvVars()?.apiUrl,
});

export default axiosInstance;
