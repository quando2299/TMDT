import axios from "axios";
import { AuthActionTypes } from "../redux/auth/auth.types";
import { store } from "../redux/store";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      store.dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
