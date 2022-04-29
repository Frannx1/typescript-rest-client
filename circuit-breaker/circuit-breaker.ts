import { BreakerOptions } from "./breaker-options";
import { HttpClient } from "../clients/http/http-client";
import {Method} from "../types/request-constants";
import {RequestConfig} from "../types/request-config-types";
import {HttpResponse} from "../types/response-types";
import {BaseHttpClient} from "../clients/http/base-http-client";

enum BreakerState {
  GREEN = "GREEN",
  RED = "RED",
  YELLOW = "YELLOW"
}

export class CircuitBreakerHttpClient extends BaseHttpClient {
  private state: BreakerState;
  private configOptions: BreakerOptions
  private httpClient: HttpClient;
  private failureCount: number;
  private successCount: number;
  private nextAttempt: number;

  constructor(httpClient: HttpClient, configOptions: BreakerOptions) {
    super();
    this.httpClient = httpClient;
    this.state = BreakerState.GREEN;

    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttempt = Date.now();

    this.configOptions = { ...configOptions };
  }

  async request<R, D>(method: Method, url: string, config?: RequestConfig<D>): Promise<HttpResponse<R>> {
    if (this.state === BreakerState.RED) {

      if (this.nextAttempt <= Date.now()) {
        this.state = BreakerState.YELLOW;
      } else {
        throw new Error("Circuit suspended. You shall not pass.");
      }
    }

    try {
      const response = await this.httpClient.request(method, url, config);

      if (response.status < 500) {
        return this.success(response.body);
      } else {
        throw this.failure(response.body);
      }
    } catch (err) {
      throw this.failure(err.message);
    }
  }

  private success(res: any): any {
    this.failureCount = 0;
    if (this.state === BreakerState.YELLOW) {
      this.successCount++;

      if (this.successCount > this.configOptions.successThreshold) {
        this.successCount = 0;
        this.state = BreakerState.GREEN;
      }
    }
    return res;
  }

  private failure(res: any): any {
    this.failureCount++;

    if (this.failureCount >= this.configOptions.failureThreshold) {
      this.state = BreakerState.RED;
      this.nextAttempt = Date.now() + this.configOptions.timeout;
    }

    this.log("Failure");
    return res;
  }

  private log(result: string): void {
    console.table({
      Result: result,
      Timestamp: Date.now(),
      Successes: this.successCount,
      Failures: this.failureCount,
      State: this.state
    });
  }
}

