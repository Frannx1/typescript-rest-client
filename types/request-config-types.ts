import {Method, ResponseEncoding} from "./request-constants";
import {ResponseHeaders} from "./response-types";
import {ResponseType} from "./response-constants";

export type RequestHeaders = Record<string, string | number | boolean>;

export interface BasicCredentials {
  username: string;
  password: string;
}

export interface ProxyConfig {
  host: string;
  port: number;
  auth?: BasicCredentials;
  protocol?: string;
}

export interface RequestTransformer {
  (body: any, headers?: RequestHeaders): any;
}

export interface ResponseTransformer {
  (body: any, headers?: ResponseHeaders): any;
}

export interface RequestConnectionConfig {
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: ProxyConfig | false;
}

export interface RequestAdvanceConfig<D = any> {
  transformRequest?: RequestTransformer[];
  transformResponse?: ResponseTransformer[];
  headers?: RequestHeaders;
  params?: any;
  paramsSerializer?: (params: any) => string;
  body?: D;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  auth?: BasicCredentials;
  responseType?: ResponseType;
  responseEncoding?: ResponseEncoding | string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  decompress?: boolean;
  signal?: AbortSignal;
  insecureHTTPParser?: boolean;
}

export interface RequestConfig<D = any> extends RequestAdvanceConfig<D>, RequestConnectionConfig { }

export interface RequestFullConfig<D = any> extends RequestConfig<D> {
  path: string;
  method: Method;
  baseUrl: string;
}