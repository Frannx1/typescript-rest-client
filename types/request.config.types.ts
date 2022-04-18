import {ResponseEncoding} from "./request.constants";
import {ResponseHeaders} from "./response.types";
import {ResponseType} from "./response.constants";
import {Method} from "axios";

export interface HttpConnectionOption {
  keepAlive?: boolean | undefined;
  freeSocketTimeout?: number | undefined;
  freeSocketKeepAliveTimeout?: number | undefined;
  timeout?: number | undefined;
  socketActiveTTL?: number | undefined;
}

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

export interface BasicRequestConfig {
  path?: string;
  method?: Method;
  baseURL?: string;
}

export interface AdvanceRequestConfig<D = any> {
  transformRequest?: RequestTransformer | RequestTransformer[];
  transformResponse?: ResponseTransformer | ResponseTransformer[];
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

export interface RequestConfig<D = any> extends AdvanceRequestConfig<D>, RequestConnectionConfig { }