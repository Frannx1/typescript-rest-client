import {RequestAdvanceConfig, ProxyConfig, RequestConnectionConfig} from "../../../types/request-config-types";
import {HttpClient} from "../../http/http-client";
import {RestClient} from "../rest-client";
import {RequestAdvanceConfigGenericBuilder} from "../../../types/builders/request-advance-config-generic-builder";

export class RestClientBuilder extends RequestAdvanceConfigGenericBuilder<any, RestClientBuilder> {

  private baseUrl: string
  private httpClient: HttpClient;
  private connectionConfig: RequestConnectionConfig;

  constructor(advanceRequestConfig?: RequestAdvanceConfig) {
    super(advanceRequestConfig);
  }

  build(): RestClient {
    return new RestClient(this.baseUrl, this.httpClient, this.connectionConfig, this.buildAdvanceRequestConfig());
  }

  withBaseUrl(baseUrl: string): RestClientBuilder {
    this.baseUrl = baseUrl;
    return this;
  }

  withHttpClient(httpClient: HttpClient): RestClientBuilder {
    this.httpClient = httpClient;
    return this;
  }

  withRequestConnectionConfig(requestConnectionConfig?: RequestConnectionConfig): RestClientBuilder {
    if (requestConnectionConfig) {
      this.connectionConfig = requestConnectionConfig;
    }
    return this;
  }

  withSocketPath(socketPath: string): RestClientBuilder {
    this.connectionConfig.socketPath = socketPath;
    return this;
  }

  withHttpAgent(httpAgent: any): RestClientBuilder {
    this.connectionConfig.httpAgent = httpAgent;
    return this;
  }

  withHttpsAgent(httpsAgent: any): RestClientBuilder {
    this.connectionConfig.httpsAgent = httpsAgent;
    return this;
  }

  withProxy(proxy: ProxyConfig): RestClientBuilder {
    this.connectionConfig.proxy = proxy;
    return this;
  }

  protected self(): RestClientBuilder {
    return this;
  }

}