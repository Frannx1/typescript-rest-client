import axios, {AxiosInstance} from 'axios';
import {HttpClient} from "./http-client";
import {RequestConfig} from "../../types/request-config-types";
import {RestResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";

export class AxiosHttpClient implements HttpClient {
  protected readonly axiosInstance: AxiosInstance;

  constructor(config?: RequestConfig) {
    this.axiosInstance = axios.create({...config});
  }

  get<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.get(url, config);
  }

  delete<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.delete(url, config);
  }

  head<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.head(url, config);
  }

  options<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.options(url, config);
  }

  patch<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.patch(url, config);
  }

  post<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.post(url, config);
  }

  put<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.put(url, config);
  }

  request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.axiosInstance.request({...config, method: method, url: url});
  }

}
