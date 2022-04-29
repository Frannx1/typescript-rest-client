import {RequestAdvanceConfig} from "../../../types/request-config-types";
import {HttpResponse} from "../../../types/response-types";
import {RestClient} from "../rest-client";
import {RequestAdvanceConfigGenericBuilder} from "../../../types/builders/request-advance-config-generic-builder";

export class RestClientRequestBuilder extends RequestAdvanceConfigGenericBuilder<any, RestClientRequestBuilder> {

  private readonly path: string;
  private readonly restClient: RestClient;

  constructor(path: string, restClient: RestClient, baseConfig: RequestAdvanceConfig) {
    super(baseConfig);
    this.path = path;
    this.restClient = restClient;
  }

  get<R>(): Promise<HttpResponse<R>> {
    return this.restClient.get(this.path, this.buildAdvanceRequestConfig());
  }

  delete<R>(): Promise<HttpResponse<R>> {
    return this.restClient.delete(this.path, this.buildAdvanceRequestConfig());
  }

  head<R>(): Promise<HttpResponse<R>> {
    return this.restClient.head(this.path, this.buildAdvanceRequestConfig());
  }

  options<R>(): Promise<HttpResponse<R>> {
    return this.restClient.options(this.path, this.buildAdvanceRequestConfig());
  }

  post<R>(): Promise<HttpResponse<R>> {
    return this.restClient.post(this.path, this.buildAdvanceRequestConfig());
  }

  put<R>(): Promise<HttpResponse<R>> {
    return this.restClient.put(this.path, this.buildAdvanceRequestConfig());
  }

  patch<R>(): Promise<HttpResponse<R>> {
    return this.restClient.patch(this.path, this.buildAdvanceRequestConfig());
  }

  protected self(): RestClientRequestBuilder {
    return this;
  }

}