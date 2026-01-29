import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../exceptions/base.exception';
import {
  InternalServerErrorException,
  NotFoundException,
} from '../exceptions/common.exceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const baseException = this.getBaseException(exception);

    console.error(baseException);

    response.status(baseException.statusCode).json({
      message: baseException.message,
      errorCode: baseException.errorCode,
      params: baseException.params,
      details: baseException.details,
      timestamp: new Date().toISOString(),
    });
  }

  getBaseException(exception: unknown) {
    if (exception instanceof BaseException) {
      return exception;
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const transformedException = this.getRespectiveException(status);
      return new transformedException(exception.cause);
    }

    const internalException = new InternalServerErrorException(exception);
    return new BaseException(internalException);
  }

  getRespectiveException(status: HttpStatus) {
    switch (status) {
      case HttpStatus.NOT_FOUND:
        return NotFoundException;
      default:
        return InternalServerErrorException;
    }
  }
}
