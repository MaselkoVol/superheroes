import { Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import {
  ValidationExceptionDetails,
  ValidationContext,
  ValidationErrorDetails,
} from '../interfaces/validation.interface';

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => this.createException(errors),
    });
  }

  createException(errors: ValidationError[]) {
    const fieldsDetails: ValidationExceptionDetails[] = [];
    errors.forEach((error: ValidationError) => {
      const fieldName = error.property;
      this.pushRecursivelyAllErrorsInto(fieldsDetails, fieldName, error);
    });
    return new ValidationException(fieldsDetails);
  }

  pushRecursivelyAllErrorsInto(
    validationDetails: ValidationExceptionDetails[],
    path: string, // required for nested objects
    error: ValidationError,
  ) {
    const errorDetails = this.getFirstErrorDetails(error);
    if (errorDetails) {
      validationDetails.push({
        field: path,
        ...errorDetails,
      });
    }

    if (!error.children) {
      return;
    }
    error.children.forEach((childError: ValidationError) => {
      const childFieldName = `${path}.${childError.property}`;
      this.pushRecursivelyAllErrorsInto(
        validationDetails,
        childFieldName,
        childError,
      );
    });
  }

  getFirstErrorDetails(error: ValidationError): ValidationErrorDetails | null {
    const ruleKeys = Object.keys(error.constraints || {});
    if (!ruleKeys.length) {
      return null;
    }
    // error key, which contains message and context of the error
    const firstRuleKey = ruleKeys[0];

    // error message must be present in the context
    if (!error.constraints || !error.constraints[firstRuleKey]) {
      return null;
    }
    const message = error.constraints[firstRuleKey];

    // error context must be present and has to contain an error code
    if (!error.contexts || !error.contexts[firstRuleKey]) {
      return null;
    }
    const contexts = error.contexts[firstRuleKey] as ValidationContext;
    if (!contexts || !contexts.errorCode) {
      return null;
    }

    return {
      message: message,
      errorCode: contexts.errorCode,
      params: contexts.params,
    };
  }
}
