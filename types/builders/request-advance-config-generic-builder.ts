import {ResponseType} from "../response-constants";
import {ResponseEncoding} from "../request-constants";
import {
  RequestAdvanceConfig,
  BasicCredentials,
  RequestHeaders,
  RequestTransformer,
  ResponseTransformer
} from "../request-config-types";
import {RequestAdvanceConfigBuildable} from "./request-advance-config-buildable";

//https://stackoverflow.com/questions/21086417/builder-pattern-and-inheritance
export abstract class RequestAdvanceConfigGenericBuilder<B, F extends RequestAdvanceConfigGenericBuilder<B, F>> implements RequestAdvanceConfigBuildable<F, B> {
  private readonly _advanceRequestConfig: RequestAdvanceConfig;

  protected constructor(advanceRequestConfig?: RequestAdvanceConfig) {
    this._advanceRequestConfig = {
      transformRequest: [ ...advanceRequestConfig?.transformRequest ],
      transformResponse: [ ...advanceRequestConfig?.transformResponse ],
      headers: { ...advanceRequestConfig?.headers },
      params: { ...advanceRequestConfig?.params },
      body: { ...advanceRequestConfig?.body },
      timeout: advanceRequestConfig?.timeout,
      timeoutErrorMessage: advanceRequestConfig?.timeoutErrorMessage,
      withCredentials: advanceRequestConfig?.withCredentials,
      auth: { ...advanceRequestConfig?.auth },
      responseType: advanceRequestConfig?.responseType,
      responseEncoding: advanceRequestConfig?.responseEncoding,
      xsrfCookieName: advanceRequestConfig?.xsrfCookieName,
      xsrfHeaderName: advanceRequestConfig?.xsrfHeaderName,
      onUploadProgress: advanceRequestConfig?.onUploadProgress,
      onDownloadProgress: advanceRequestConfig?.onDownloadProgress,
      maxContentLength: advanceRequestConfig?.maxContentLength,
      validateStatus: advanceRequestConfig?.validateStatus,
      maxBodyLength: advanceRequestConfig?.maxBodyLength,
      maxRedirects: advanceRequestConfig?.maxRedirects,
      decompress: advanceRequestConfig?.decompress,
      signal: advanceRequestConfig?.signal,
      insecureHTTPParser: advanceRequestConfig?.insecureHTTPParser,
    }
  }

  protected buildAdvanceRequestConfig(): RequestAdvanceConfig<B> {
    return { ...this._advanceRequestConfig };
  }

  protected abstract self(): F;

  withTransformRequestLast(transformRequest: RequestTransformer): F {
    this._advanceRequestConfig.transformRequest.push(transformRequest);
    return this.self();
  }

  withTransformResponse(transformResponse: ResponseTransformer): F {
    this._advanceRequestConfig.transformResponse.push(transformResponse);
    return this.self();
  }

  withHeaders(headers: RequestHeaders): F {
    this._advanceRequestConfig.headers = { ...headers };
    return this.self();
  }

  withHeader(name: string, value: string | number | boolean): F {
    this._advanceRequestConfig.headers = { ...this._advanceRequestConfig.headers,  ...{ name: value } };
    return this.self();
  }

  withParams(params: any): F {
    this._advanceRequestConfig.params = { ...params };
    return this.self();
  }

  withParam(name: string, value: string): F {
    this._advanceRequestConfig.params = { ...this._advanceRequestConfig.params, ...{ name: value } };
    return this.self();
  }

  withParamsSerializer(paramsSerializer: (params: any) => string): F {
    this._advanceRequestConfig.paramsSerializer = paramsSerializer;
    return this.self();
  }

  withBody(body: B): F {
    this._advanceRequestConfig.body = body;
    return this.self();
  }

  withTimeout(timeout: number): F {
    this._advanceRequestConfig.timeout = timeout;
    return this.self();
  }

  withTimeoutErrorMessage(timeoutErrorMessage: string): F {
    this._advanceRequestConfig.timeoutErrorMessage = timeoutErrorMessage;
    return this.self();
  }

  withHasToIncludeCredentials(withCredentials: boolean): F {
    this._advanceRequestConfig.withCredentials = withCredentials;
    return this.self();
  }

  withAuth(auth: BasicCredentials): F {
    this._advanceRequestConfig.auth = auth;
    return this.self();
  }

  withResponseType(responseType: ResponseType): F {
    this._advanceRequestConfig.responseType = responseType;
    return this.self();
  }

  withResponseEncoding(responseEncoding: ResponseEncoding | string): F {
    this._advanceRequestConfig.responseEncoding = responseEncoding;
    return this.self();
  }

  withXsrfCookieName(xsrfCookieName: string): F {
    this._advanceRequestConfig.xsrfCookieName = xsrfCookieName;
    return this.self();
  }

  withXsrfHeaderName(xsrfHeaderName: string): F {
    this._advanceRequestConfig.xsrfHeaderName = xsrfHeaderName;
    return this.self();
  }

  withOnUploadProgress(onUploadProgress: (progressEvent: any) => void): F {
    this._advanceRequestConfig.onUploadProgress = onUploadProgress;
    return this.self();
  }

  withOnDownloadProgress(onDownloadProgress: (progressEvent: any) => void): F {
    this._advanceRequestConfig.onDownloadProgress = onDownloadProgress;
    return this.self();
  }

  withMaxContentLength(maxContentLength: number): F {
    this._advanceRequestConfig.maxContentLength = maxContentLength;
    return this.self();
  }

  withValidateStatus(validateStatus: ((status: number) => boolean) | null): F {
    this._advanceRequestConfig.validateStatus = validateStatus;
    return this.self();
  }

  withMaxBodyLength(maxBodyLength: number): F {
    this._advanceRequestConfig.maxBodyLength = maxBodyLength;
    return this.self();
  }

  withMaxRedirects(maxRedirects: number): F {
    this._advanceRequestConfig.maxRedirects = maxRedirects;
    return this.self();
  }

  withShouldDecompress(decompress: boolean): F {
    this._advanceRequestConfig.decompress = decompress;
    return this.self();
  }

  withSignal(signal: AbortSignal): F {
    this._advanceRequestConfig.signal = signal;
    return this.self();
  }

  withInsecureHTTPParser(insecureHTTPParser: boolean): F {
    this._advanceRequestConfig.insecureHTTPParser = insecureHTTPParser;
    return this.self();
  }
}
