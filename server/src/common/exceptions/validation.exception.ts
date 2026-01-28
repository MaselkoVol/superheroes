import { AppErrorCode } from '../constants/error-codes.app';
import {
  FieldValidationDetails,
  ValidaitonExceptionOptions,
} from '../interfaces/validation.interface';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(details: FieldValidationDetails[]) {
    const params: ValidaitonExceptionOptions = {
      message: 'Помилка валідації',
      errorCode: AppErrorCode.VALIDATION_ERROR,
      details: details,
    };
    super(params);
  }
}
