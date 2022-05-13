import {AdapterInterceptor} from "./adapter.interceptor";
import {AxiosResponse} from "axios";
import {HttpResponse} from "../../types/response-types";

export class AxiosResponseAdapterInterceptor implements AdapterInterceptor<AxiosResponse, HttpResponse> {

  intercept(axiosResponse: AxiosResponse): HttpResponse {
    return {
      body: axiosResponse.data,
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      request: axiosResponse.request
    }
  }
}