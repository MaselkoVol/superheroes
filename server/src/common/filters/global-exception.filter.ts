import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { InternalServerErrorException } from '../exceptions/internal-server-error.exception';
import { BaseException } from '../exceptions/base.exception';
import { ApiWrappedException } from '../exceptions/api-wrapped.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const apiException = this.getApiException(exception);

    console.error(apiException);

    return response.status(apiException.statusCode).json({
      message: apiException.message,
      errorCode: apiException.errorCode,
      params: apiException.params,
      details: apiException.details,
      timestamp: new Date().toISOString(),
    });
  }

  getApiException(exception: unknown) {
    if (exception instanceof ApiWrappedException) {
      return exception;
    }

    if (exception instanceof BaseException) {
      return new ApiWrappedException(exception);
    }

    const internalException = new InternalServerErrorException(exception);
    return new ApiWrappedException(internalException);
  }
}
