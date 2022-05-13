export type ResponseHeaders = Record<string, string>;

export interface HttpResponse<T = any>  {
  body: T;
  status: number;
  headers: ResponseHeaders;
  request?: any;
}
