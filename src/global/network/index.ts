import axios from "axios";
import Cookies from "js-cookie";
import { getAuthCredentials } from "../auth/jwt";

const http = axios.create({
  // baseURL: import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT,
  timeout: 300000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// Change request data/error here
http.interceptors.request.use(
  (config:any) => {
    const token = getAuthCredentials();
    config.headers = {
      ...config.headers,
      Authorization: `${token}`,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Change response data/error here
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      Cookies.remove("ayka_cookie_jwt");
    }
    return error.response;
  }
);

export default http;
