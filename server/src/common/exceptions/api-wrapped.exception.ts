import { HttpStatus } from '@nestjs/common';
import { ErrorCodeToHttpMap } from '../constants/error-http.map';
import { BaseException } from './base.exception';

export class ApiWrappedException extends BaseException {
  statusCode: HttpStatus;
  constructor(baseException: BaseException) {
    super(baseException);
    this.statusCode = ErrorCodeToHttpMap[baseException.errorCode];
  }
}
