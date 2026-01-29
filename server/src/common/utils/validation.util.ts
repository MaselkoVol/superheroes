import { ValidationOptions } from 'class-validator';
import {
  ValidationContext,
  ValidationErrorDetails,
} from '../interfaces/validation.interface';

export class ValidationUtil {
  // create options for class-validator library
  static createOptions(details: ValidationErrorDetails): ValidationOptions {
    const context: ValidationContext = { errorCode: details.errorCode };
    if (details.params) {
      context.params = details.params;
    }
    return {
      message: details.message,
      always: details.always,
      each: details.each,
      groups: details.groups,
      context: context,
    };
  }
}
