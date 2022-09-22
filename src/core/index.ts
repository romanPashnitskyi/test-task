import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const superConfig = config;
    const user = localStorage.getItem("user");

    if (!!user && superConfig.headers) {
      const token = JSON.parse(user).token

      superConfig.headers.Authorization = token;
    }

    return superConfig;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(undefined, (err) => {
  switch (err.response.status) {
    case 401: {
      localStorage.removeItem("token");
      window.location.replace("/sign-in");
      break;
    }
    default:
      break;
  }
  return Promise.reject(err);
});
