import axios, { AxiosInstance } from "axios";
import getEnvVars from "environment";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getEnvVars()?.apiUrl,
});

export default axiosInstance;

// import axios, { AxiosInstance } from "axios";
// import getEnvVars from "environment";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Axios 인스턴스 생성
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: getEnvVars()?.apiUrl,
// });

// // 요청 인터셉터 설정
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("accessToken"); // 저장된 토큰 가져오기
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 설정
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // 토큰이 만료된 경우 처리
//     if (error.response.status === 403) {
//       console.error("Access denied: invalid or expired token");
//       // 필요한 경우 토큰 갱신 로직 추가
//     }
//     return Promise.reject(error);
//   }
// );
//
// export default axiosInstance;
