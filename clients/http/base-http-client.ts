import {HttpClient, HttpError} from "./http-client";
import {RequestConfig} from "../../types/request-config-types";
import {HttpResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";
import {RequestInterceptor, ResponseErrorInterceptor, ResponseInterceptor} from "../../interceptors/interceptor";

export abstract class BaseHttpClient<T extends BaseHttpClient<T>> implements HttpClient<T> {

  get<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('GET', url, config);
  }

  delete<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('DELETE', url, config);
  }

  head<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('HEAD', url, config);
  }

  options<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('OPTIONS', url, config);
  }

  patch<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('PATCH', url, config);
  }

  post<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('POST', url, config);
  }

  put<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    return this.request('PUT', url, config);
  }

  isHttpError(payload: any): payload is HttpError {
    return payload instanceof HttpError;
  };

  abstract request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;

  abstract withErrorResponseInterceptorLast(errorResponseInterceptor: ResponseErrorInterceptor): T;

  abstract withRequestInterceptorLast(requestInterceptor: RequestInterceptor): T;

  abstract withResponseInterceptorLast(responseInterceptor: ResponseInterceptor): T;

}
