import {Interceptor, ResponseErrorInterceptor} from './interceptor';
import axios, { AxiosError } from 'axios';

export class LogHttpErrorInterceptor implements ResponseErrorInterceptor {
  private readonly logger: any;

  constructor(logger: any) {
    this.logger = logger.child({ method: 'interceptError' });
  }

  intercept(error: any): any {
    if (axios.isAxiosError(error)) {
      this.logger.warn(
        LogHttpErrorInterceptor.getMessageFromAxiosError(error),
        {
          error,
          parameters:
            LogHttpErrorInterceptor.extractParametersFromAxiosError(error),
        }
      );
    } else {
      this.logger.crit(
        'Something happened with the request and it was not an http error',
        {
          error,
        }
      );
    }
  }

  private static extractParametersFromAxiosError(
    error: AxiosError
  ): Record<string, any> {
    return {
      host: error.config.url,
      httpMethod: error.config.method,
      statusCode: error.response?.status,
    };
  }

  private static getMessageFromAxiosError(error: AxiosError): string {
    let message: string;
    if (error.response) {
      if (error.response.status >= 500) {
        message = 'Service unavailable';
      } else if (error.response.status >= 400) {
        message = 'Bad Request, verify the API signature';
      } else {
        message =
          'Unexpected status code, validate properly the expected status code';
      }
    } else {
      message = 'The request did not get a response';
    }
    return message;
  }
}
