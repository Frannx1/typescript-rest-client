import {HttpClient} from "./http-client";
import {RequestConfig} from "../../types/request-config-types";
import {HttpResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";


export abstract class BaseHttpClient implements HttpClient {

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

  abstract request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
}