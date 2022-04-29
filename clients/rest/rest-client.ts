import {HttpClient} from "../http/http-client";
import {RequestAdvanceConfig, RequestConnectionConfig} from "../../types/request-config-types";
import {RestClientRequestBuilder} from "./builders/rest-client-request-builder";
import {HttpResponse} from "../../types/response-types";
import {Method} from "../../types/request-constants";

export class RestClient {
  private readonly baseUrl: string;
  private readonly httpClient: HttpClient;
  private readonly connectionConfig: RequestConnectionConfig;
  private readonly advanceRequestConfig?: RequestAdvanceConfig;

  constructor(
    baseUrl: string,
    httpClient: HttpClient,
    connectionConfig: RequestConnectionConfig,
    advanceRequestConfig?: RequestAdvanceConfig,
  ) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
    this.connectionConfig = connectionConfig;
    this.advanceRequestConfig = advanceRequestConfig;
  }

  newRequestBuilder(path: string): RestClientRequestBuilder {
    return new RestClientRequestBuilder(path, this, { ...this.advanceRequestConfig });
  }

  get<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('GET', path, advanceRequestConfig);
  }

  delete<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('DELETE', path, advanceRequestConfig);
  }

  head<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('HEAD', path, advanceRequestConfig);
  }

  options<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('OPTIONS', path, advanceRequestConfig);
  }

  post<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('POST', path, advanceRequestConfig);
  }

  put<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('PUT', path, advanceRequestConfig);
  }

  patch<R>(path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    return this.request('PATCH', path, advanceRequestConfig);
  }

  request<R>(method: Method, path: string, advanceRequestConfig?: RequestAdvanceConfig): Promise<HttpResponse<R>> {
    const url = this.baseUrl + path;
    const requestConfig = advanceRequestConfig ? advanceRequestConfig : this.advanceRequestConfig
    return this.httpClient.request(method, url, {...requestConfig, ...this.connectionConfig});
  }

}
