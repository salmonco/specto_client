import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost = Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";
const KAKAO_REST_API_KEY = "9a0bd424b1cfd4144df8ad8a3a2d39db";
const KAKAO_REDIRECT_URI = "https://spectacle-specto.vercel.app/loading";
const KAKAO_CLIENT_SECRET = "HKVOwsqW8RdZogyaz8dxHawXYVnvramd";

const ENV = {
  dev: {
    apiUrl: "http://13.210.239.98:8080",
    KAKAO_REST_API_KEY,
    KAKAO_REDIRECT_URI,
    KAKAO_CLIENT_SECRET,
    // amplitudeApiKey: null,
  },
  staging: {
    apiUrl: "http://13.210.239.98:8080",
    KAKAO_REST_API_KEY,
    KAKAO_REDIRECT_URI,
    KAKAO_CLIENT_SECRET,
    // amplitudeApiKey: "[Enter your key here]",
    // Add other keys you want here
  },
  prod: {
    apiUrl: "http://13.210.239.98:8080",
    KAKAO_REST_API_KEY,
    KAKAO_REDIRECT_URI,
    KAKAO_CLIENT_SECRET,
    // amplitudeApiKey: "[Enter your key here]",
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest2.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
