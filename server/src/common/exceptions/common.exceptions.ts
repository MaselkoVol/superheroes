import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from '../constants/error-codes.app';
import { BaseException } from './base.exception';

export class InternalServerErrorException extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Internal server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: AppErrorCode.INTERNAL_SERVER_ERROR,
      cause: cause,
    });
  }
}

export class NotFoundException extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Resource not found',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: AppErrorCode.NOT_FOUND,
      cause: cause,
    });
  }
}
