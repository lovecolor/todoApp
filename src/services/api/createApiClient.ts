import axios, { AxiosInstance } from "axios"

export type CreateApiClientArgs = {
  baseURL?: string
}

export const createApiClient = (args: CreateApiClientArgs): AxiosInstance => {
  const { baseURL } = args

  const api = axios.create({
    baseURL,
  })
  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}` || ''
    return config;
  });
  api.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response;
      }
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      return Promise.reject(error.response?.data);
    }
  );

  return api
}
