import {RequestFullConfig} from "../types/request-config-types";
import {HttpResponse} from "../types/response-types";

export interface HttpInterceptable<T> {
  withRequestInterceptorLast(requestInterceptor: RequestInterceptor): T;
  withResponseInterceptorLast(responseInterceptor: ResponseInterceptor): T;
  withErrorResponseInterceptorLast(errorResponseInterceptor: ResponseErrorInterceptor): T;
}

export interface RequestInterceptor extends Interceptor<RequestFullConfig> { }

export interface ResponseInterceptor extends Interceptor<HttpResponse> { }

export interface ResponseErrorInterceptor extends Interceptor<any> { }

export interface Interceptor<T> {
  intercept(value: T): T;
}

