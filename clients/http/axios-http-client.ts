import axios, {AxiosInstance} from 'axios';
import {RequestConfig} from "../../types/request-config-types";
import {HttpResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";
import {BaseHttpClient} from "./base-http-client";
import {RequestInterceptor, ResponseErrorInterceptor, ResponseInterceptor} from "../../interceptors/interceptor";
import {AxiosResponseAdapterInterceptor} from "../../interceptors/adapters/axios-response-adapter-interceptor";
import {AxiosErrorAdapterInterceptor} from "../../interceptors/adapters/axios-error-adapter-interceptor";

export class AxiosHttpClient extends BaseHttpClient<AxiosHttpClient> {
  protected readonly axiosInstance: AxiosInstance;

  constructor(config?: RequestConfig) {
    super();
    this.axiosInstance = axios.create({...config});
    const axiosResponseAdapterInterceptor = new AxiosResponseAdapterInterceptor();
    const axiosErrorAdapterInterceptor = new AxiosErrorAdapterInterceptor();
    this.axiosInstance.interceptors.response.use(axiosResponseAdapterInterceptor.intercept, axiosErrorAdapterInterceptor.intercept)
  }

  request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.axiosInstance.request({...config, method: method, url: url});
  }

  withErrorResponseInterceptorLast(errorResponseInterceptor: ResponseErrorInterceptor): AxiosHttpClient {
    this.axiosInstance.interceptors.response.use(undefined, errorResponseInterceptor.intercept);
    return this;
  }

  withRequestInterceptorLast(requestInterceptor: RequestInterceptor): AxiosHttpClient {
    this.axiosInstance.interceptors.response.use(undefined, requestInterceptor.intercept);
    return this;
  }

  withResponseInterceptorLast(responseInterceptor: ResponseInterceptor): AxiosHttpClient {
    this.axiosInstance.interceptors.response.use(undefined, responseInterceptor.intercept);
    return this;
  }
}