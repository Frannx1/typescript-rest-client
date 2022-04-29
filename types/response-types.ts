export type ResponseHeaders = Record<string, string>;

export interface HttpResponse<T = any>  {
  body: T;
  status: number;
  statusText?: string;
  headers: ResponseHeaders;
  request?: any;
}
