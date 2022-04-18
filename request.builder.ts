import {AdvanceRequestConfig} from "./types/request.config.types";
import {RestResponse} from "./types/response.types";
import {RestClient} from "./rest-client";

export class RequestBuilder {

  protected readonly path: string;
  protected readonly restClient: RestClient;
  protected readonly baseConfig: AdvanceRequestConfig;

  constructor(path: string, restClient: RestClient, baseConfig: AdvanceRequestConfig) {
    this.path = path;
    this.restClient = restClient;
    this.baseConfig = baseConfig;
  }

  get<R>(): Promise<RestResponse<R>> {
    return this.restClient.get(this.path, this.baseConfig);
  }

  delete<R>(): Promise<RestResponse<R>> {
    return this.restClient.delete(this.path, this.baseConfig);
  }

  head<R>(): Promise<RestResponse<R>> {
    return this.restClient.head(this.path, this.baseConfig);
  }

  options<R>(): Promise<RestResponse<R>> {
    return this.restClient.options(this.path, this.baseConfig);
  }

  post<R>(): Promise<RestResponse<R>> {
    return this.restClient.post(this.path, this.baseConfig);
  }

  put<R>(): Promise<RestResponse<R>> {
    return this.restClient.put(this.path, this.baseConfig);
  }

  patch<R>(): Promise<RestResponse<R>> {
    return this.restClient.patch(this.path, this.baseConfig);
  }

}