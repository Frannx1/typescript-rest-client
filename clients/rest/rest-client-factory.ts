import {RestClient} from "./rest-client";
import {RestClientBuilder} from "./builders/rest-client-builder";
import {AxiosHttpClient} from "../http/axios-http-client";
import {RequestAdvanceConfig, RequestConnectionConfig} from "../../types/request-config-types";
import * as Agent from "agentkeepalive";
import {HttpOptions, HttpsAgent, HttpsOptions} from "agentkeepalive";
import {BreakerOptions} from "../../circuit-breaker/breaker-options";
import {CircuitBreakerHttpClient} from "../../circuit-breaker/circuit-breaker";
import {HttpClient} from "../http/http-client";

export class RestClientFactory {

  static readonly HttpDefaultOptions: HttpOptions = {
    keepAlive: true,
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000,
    freeSocketTimeout: 30000,
  }

  static buildDefaultRestClient(
    baseUrl: string,
    https: boolean,
    http: boolean,
    circuitBreakerConfig?: BreakerOptions,
  ): RestClient {
    const restClientBuilder: RestClientBuilder = new RestClientBuilder()
      .withBaseUrl(baseUrl)
      .withHttpClient(RestClientFactory.getHttpClient(circuitBreakerConfig));

    if (https) {
      restClientBuilder.withHttpAgent(new Agent(RestClientFactory.HttpDefaultOptions));
    }
    if (http) {
      restClientBuilder.withHttpsAgent(new HttpsAgent(RestClientFactory.HttpDefaultOptions));
    }

    return restClientBuilder.build();
  }

  static buildAxiosRestClientWithConnectionConfig(
    baseUrl: string,
    connectionConfig: RequestConnectionConfig,
    advanceRequestConfig?: RequestAdvanceConfig,
    circuitBreakerConfig?: BreakerOptions,
  ): RestClient {
    return new RestClientBuilder(advanceRequestConfig)
      .withBaseUrl(baseUrl)
      .withHttpClient(RestClientFactory.getHttpClient(circuitBreakerConfig))
      .withRequestConnectionConfig(connectionConfig)
      .build()
  }

  static buildAxiosRestClientWithHttpConnectionOption(
    baseUrl: string,
    httpOptions?: HttpOptions,
    httpsOptions?: HttpsOptions,
    connectionConfig?: RequestConnectionConfig,
    advanceRequestConfig?: RequestAdvanceConfig,
    circuitBreakerConfig?: BreakerOptions,
  ): RestClient {
    const restClientBuilder: RestClientBuilder = new RestClientBuilder(advanceRequestConfig)
      .withBaseUrl(baseUrl)
      .withHttpClient(RestClientFactory.getHttpClient(circuitBreakerConfig))
      .withRequestConnectionConfig(connectionConfig)
    if (httpsOptions) {
      restClientBuilder.withHttpAgent(new Agent(httpOptions));
    }
    if (httpsOptions) {
      restClientBuilder.withHttpsAgent(new HttpsAgent(httpsOptions));
    }
    return restClientBuilder.build();
  }

  private static getHttpClient(circuitBreakerConfig?: BreakerOptions): HttpClient {
    if (circuitBreakerConfig) {
      return new CircuitBreakerHttpClient(new AxiosHttpClient(), circuitBreakerConfig);
    } else {
      return new AxiosHttpClient();
    }
  }
}