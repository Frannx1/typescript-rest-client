import {HttpClient} from "./http-client";
import {AdvanceRequestConfig, RequestConfig, RequestConnectionConfig} from "./types/request.config.types";
import {RequestBuilder} from "./request.builder";
import {RestResponse} from "./types/response.types";
import {Method} from "./types/request.constants";


export class RestClient {

  protected readonly baseUrl: string;
  protected readonly httpClient: HttpClient;
  protected readonly connectionConfig: RequestConnectionConfig;
  protected readonly advanceRequestConfig: AdvanceRequestConfig;

  constructor(baseUrl: string, httpClient: HttpClient, requestConfig: RequestConfig) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
    this.connectionConfig = requestConfig;
    this.advanceRequestConfig = requestConfig;
  }

  newRequestBuilder(path: string): RequestBuilder {
    return new RequestBuilder(path, this, {...this.advanceRequestConfig});
  }

  get<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('GET', path, advanceRequestConfig);
  }

  delete<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('DELETE', path, advanceRequestConfig);
  }

  head<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('HEAD', path, advanceRequestConfig);
  }

  options<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('OPTIONS', path, advanceRequestConfig);
  }

  post<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('POST', path, advanceRequestConfig);
  }

  put<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('PUT', path, advanceRequestConfig);
  }

  patch<R>(path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    return this.request('PATCH', path, advanceRequestConfig);
  }

  request<R>(method: Method, path: string, advanceRequestConfig?: AdvanceRequestConfig): Promise<RestResponse<R>> {
    const url = this.baseUrl + path;
    const requestConfig = advanceRequestConfig ? advanceRequestConfig : this.advanceRequestConfig
    return this.httpClient.request(method, url, {...requestConfig, ...this.connectionConfig});
  }

}
