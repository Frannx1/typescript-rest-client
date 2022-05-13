import {AdapterInterceptor} from "./adapter.interceptor";

export class AxiosErrorAdapterInterceptor implements AdapterInterceptor<any, any> {

  intercept(error: any): any {
    return { }
  }
}