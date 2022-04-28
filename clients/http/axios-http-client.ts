import axios, {AxiosInstance, AxiosResponse} from 'axios';
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
    return this.request('GET', url, config);
  }

  delete<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.request('DELETE', url, config);
  }

  head<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.request('HEAD', url, config);
  }

  options<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.request('OPTIONS', url, config);
  }

  patch<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.request('PATCH', url, config);
  }

  post<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.request('POST', url, config);
  }

  put<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return this.request('PUT', url, config);
  }

  request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<RestResponse<R>> {
    return AxiosHttpClient.adaptAxiosResponse(this.axiosInstance.request({...config, method: method, url: url}));
  }

  private static adaptAxiosResponse<T>(axiosResponsePromise: Promise<AxiosResponse<T>>): Promise<RestResponse<T>> {
    return axiosResponsePromise.then(axiosResponse => {
      return {
        body: axiosResponse.data,
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        headers: axiosResponse.headers,
        request: axiosResponse.request
      }
    });
  }
}