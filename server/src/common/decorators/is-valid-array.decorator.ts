import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { ValidationErrorCode } from '../constants/error-codes.validation';
import { ValidationUtil } from '../utils/validation.util';
import { applyDecorators } from '@nestjs/common';
import { DecoratorAdditionalOptions } from '../interfaces/validation.interface';

export function IsValidArray(
  fieldName: string,
  min?: number,
  max?: number,
  options?: DecoratorAdditionalOptions,
) {
  const decorators: ClassDecorator[] | PropertyDecorator[] = [
    IsArray(
      ValidationUtil.createOptions({
        message: `${fieldName} should be a valid array`,
        errorCode: ValidationErrorCode.NOT_ARRAY,
        ...options,
      }),
    ),
  ];

  if (min !== undefined) {
    decorators.push(
      ArrayMinSize(
        min,
        ValidationUtil.createOptions({
          message: `${fieldName} should have at least ${min} items`,
          errorCode: ValidationErrorCode.ARRAY_TOO_SHORT,
          params: { min },
          ...options,
        }),
      ),
    );
  }

  if (max !== undefined) {
    decorators.push(
      ArrayMaxSize(
        max,
        ValidationUtil.createOptions({
          message: `${fieldName} should have no more than ${max} items`,
          errorCode: ValidationErrorCode.ARRAY_TOO_LONG,
          params: { max },
          ...options,
        }),
      ),
    );
  }

  return applyDecorators(...decorators);
}
