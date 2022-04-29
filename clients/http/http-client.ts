import {RequestConfig} from "../../types/request-config-types";
import {HttpResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";

export interface HttpClient {
  get<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  delete<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  head<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  options<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  post<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  put<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  patch<R, D>(url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
  request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>>;
}
