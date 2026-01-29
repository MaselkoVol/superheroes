import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from '../constants/error-codes.app';
import {
  BaseExceptionOptions,
  ErrorParams,
} from '../interfaces/exception.interface';

export class BaseException extends Error {
  errorCode: AppErrorCode;
  statusCode: HttpStatus;
  details?: unknown;
  params?: ErrorParams;
  constructor(options: BaseExceptionOptions) {
    super(options.message, { cause: options.cause });
    this.statusCode = options.statusCode;
    this.errorCode = options.errorCode;
    this.params = options.params;
    this.details = options.details;
    this.name = this.constructor.name;
  }
}
