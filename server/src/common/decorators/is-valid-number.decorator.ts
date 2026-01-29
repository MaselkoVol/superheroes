import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { ValidationErrorCode } from '../constants/error-codes.validation';
import { ValidationUtil } from '../utils/validation.util';
import { applyDecorators } from '@nestjs/common';
import { DecoratorAdditionalOptions } from '../interfaces/validation.interface';

export function IsValidNumber(
  fieldName: string,
  min?: number,
  max?: number,
  options?: DecoratorAdditionalOptions,
) {
  const decorators: ClassDecorator[] | PropertyDecorator[] = [
    IsNumber(
      { allowInfinity: false, allowNaN: false },
      ValidationUtil.createOptions({
        message: `${fieldName} should be a valid number`,
        errorCode: ValidationErrorCode.NOT_NUMBER,
        ...options,
      }),
    ),
  ];

  if (min !== undefined) {
    decorators.push(
      Min(
        min,
        ValidationUtil.createOptions({
          message: `${fieldName} should be bigger than ${min}`,
          errorCode: ValidationErrorCode.NUMBER_TOO_SMALL,
          params: { min },
          ...options,
        }),
      ),
    );
  }

  if (max !== undefined) {
    decorators.push(
      Max(
        max,
        ValidationUtil.createOptions({
          message: `${fieldName} should be smaller than ${max}`,
          errorCode: ValidationErrorCode.NUMBER_TOO_BIG,
          params: { max },
          ...options,
        }),
      ),
    );
  }

  return applyDecorators(...decorators);
}
