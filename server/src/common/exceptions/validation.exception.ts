import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from '../constants/error-codes.app';
import {
  ValidationExceptionDetails,
  ValidaitonExceptionOptions,
} from '../interfaces/validation.interface';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(details: ValidationExceptionDetails[]) {
    const params: ValidaitonExceptionOptions = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation exception',
      errorCode: AppErrorCode.VALIDATION_ERROR,
      details: details,
    };
    super(params);
  }
}
