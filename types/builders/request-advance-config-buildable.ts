import {BasicCredentials, RequestHeaders, RequestTransformer, ResponseTransformer} from "../request-config-types";
import {ResponseType} from "../response-constants";
import {ResponseEncoding} from "../request-constants";

export interface RequestAdvanceConfigBuildable<B, T> {
  withTransformRequestLast(transformRequest: RequestTransformer): B;
  withTransformResponse(transformResponse: ResponseTransformer): B;
  withHeaders(headers: RequestHeaders): B;
  withHeader(name: string, value: string | number | boolean): B;
  withParams(params: any): B;
  withParam(name: string, value: string): B;
  withParamsSerializer(paramsSerializer: (params: any) => string): B;
  withBody(body: T): B;
  withTimeout(timeout: number): B;
  withTimeoutErrorMessage(timeoutErrorMessage: string): B;
  withHasToIncludeCredentials(withCredentials: boolean): B;
  withAuth(auth: BasicCredentials): B;
  withResponseType(responseType: ResponseType): B;
  withResponseEncoding(responseEncoding: ResponseEncoding | string): B;
  withXsrfCookieName(xsrfCookieName: string): B;
  withXsrfHeaderName(xsrfHeaderName: string): B;
  withOnUploadProgress(onUploadProgress: (progressEvent: any) => void): B;
  withOnDownloadProgress(onDownloadProgress: (progressEvent: any) => void): B;
  withMaxContentLength(maxContentLength: number): B;
  withValidateStatus(validateStatus: ((status: number) => boolean) | null): B;
  withMaxBodyLength(maxBodyLength: number): B;
  withMaxRedirects(maxRedirects: number): B;
  withShouldDecompress(decompress: boolean): B;
  withSignal(signal: AbortSignal): B;
  withInsecureHTTPParser(insecureHTTPParser: boolean): B;
}
