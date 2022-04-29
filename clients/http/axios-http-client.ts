import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {RequestConfig} from "../../types/request-config-types";
import {HttpResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";
import {BaseHttpClient} from "./base-http-client";

export class AxiosHttpClient extends BaseHttpClient {
  protected readonly axiosInstance: AxiosInstance;

  constructor(config?: RequestConfig) {
    super();
    this.axiosInstance = axios.create({...config});
  }

  request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return AxiosHttpClient.adaptAxiosResponse(this.axiosInstance.request({...config, method: method, url: url}));
  }

  private static adaptAxiosResponse<T>(axiosResponsePromise: Promise<AxiosResponse<T>>): Promise<HttpResponse<T>> {
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