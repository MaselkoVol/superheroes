import { ValidationErrorCode } from '../constants/error-codes.validation';
import { BaseExceptionOptions, ErrorParams } from './exception.interface';

export interface ValidationErrorDetails {
  message: string;
  errorCode: ValidationErrorCode;
  params?: ErrorParams;
}

export interface FieldValidationDetails extends ValidationErrorDetails {
  field: string;
}

export interface ValidaitonExceptionOptions extends BaseExceptionOptions {
  details: FieldValidationDetails[];
}

export interface ValidationContext {
  errorCode: ValidationErrorCode;
  params?: ErrorParams;
}
