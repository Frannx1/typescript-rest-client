import {RequestConfig} from "./types/request.config.types";
import {RestResponse} from "./types/response.types";
import {Method} from "./types/request.constants";

export interface HttpClient {
  get<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  delete<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  head<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  options<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  post<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  put<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  patch<R, D>(url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
  request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<RestResponse<R>>;
}
