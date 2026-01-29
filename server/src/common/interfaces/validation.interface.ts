import { ValidationOptions } from 'class-validator';
import { ValidationErrorCode } from '../constants/error-codes.validation';
import { BaseExceptionOptions, ErrorParams } from './exception.interface';

// extends class validator ValidationOptions interface, used to create custom validation error
export type ValidationErrorDetails = Omit<
  ValidationOptions,
  'context' | 'message'
> & {
  message: string;
  errorCode: ValidationErrorCode;
  params?: ErrorParams;
};

export interface ValidationExceptionDetails {
  field: string;
  message: string;
  errorCode: ValidationErrorCode;
  params?: ErrorParams;
}

export interface ValidaitonExceptionOptions extends BaseExceptionOptions {
  details: ValidationExceptionDetails[];
}

export interface ValidationContext {
  errorCode: ValidationErrorCode;
  params?: ErrorParams;
}

// used specificly for custom decorators
export type DecoratorAdditionalOptions = Omit<
  ValidationErrorDetails,
  'message' | 'errorCode' | 'params'
>;
