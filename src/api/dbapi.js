import axios from "axios";
import CookieService from "../utils/CookieService";

const taskApi = axios.create({
  baseURL: `http://localhost/api/`,
});

taskApi.interceptors.request.use(
  (config) => {
    if (CookieService.get("token")) {
      config.headers.Authorization = `Bearer ${CookieService.get("token")}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default taskApi;
