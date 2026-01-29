import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationErrorCode } from '../constants/error-codes.validation';
import { ValidationUtil } from '../utils/validation.util';
import { DecoratorAdditionalOptions } from '../interfaces/validation.interface';

export function IsValidString(
  fieldName: string,
  min?: number,
  max?: number,
  options?: DecoratorAdditionalOptions,
) {
  const decorators: ClassDecorator[] | PropertyDecorator[] = [
    IsString(
      ValidationUtil.createOptions({
        message: `${fieldName} should be a valid string`,
        errorCode: ValidationErrorCode.NOT_STRING,
        ...options,
      }),
    ),
  ];

  if (min !== undefined) {
    decorators.push(
      MinLength(
        min,
        ValidationUtil.createOptions({
          message: `${fieldName} should be at least ${min} characters long`,
          errorCode: ValidationErrorCode.STRING_TOO_SHORT,
          params: { min },
          ...options,
        }),
      ),
    );
  }

  if (max !== undefined) {
    decorators.push(
      MaxLength(
        max,
        ValidationUtil.createOptions({
          message: `${fieldName} should be no longer than ${max} characters long`,
          errorCode: ValidationErrorCode.STRING_TOO_LONG,
          params: { max },
          ...options,
        }),
      ),
    );
  }

  return applyDecorators(...decorators);
}
