import Qs from "qs";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { Env } from "../../config/env";
import storage from "../../utils/storage";
import { message } from "antd";
import { apiLoadingStore } from "../../models";

export const api: AxiosInstance = axios.create({
  baseURL: Env.url,
  headers: {
    Accept: "application/json",
  },
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
});

/* 请求拦截器 */
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === "post") apiLoadingStore.setLoading(true);
    let token = storage.sessionGet("token");
    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = token as string;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/* 响应拦截器 */
api.interceptors.response.use(
  (response) => { 
    apiLoadingStore.setLoading(false);
    if (response.config.method === "post" && response.data?.status && !response.data?.data?.currentPage) message.success(response.data?.message);
    if (!response.data?.status && response.data?.message) message.error(response.data?.message);
    return response;
  },
  (error) => {
    apiLoadingStore.setLoading(false);
    if (error.response.status === 401) {
      storage.sessionRemove("token");
      return Promise.reject(error);
    } else {
      if (error.response.status === 500 && !!error.response?.data && error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.msg && error.msg.includes("timeout")) {
        message.error("请求超时，请稍后再试！");
      }
      return Promise.reject(error.response.data.message);
    }
  }
);
