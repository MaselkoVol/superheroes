import { applyDecorators } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { ValidationErrorCode } from '../constants/error-codes.validation';
import { DecoratorAdditionalOptions } from '../interfaces/validation.interface';
import { ValidationUtil } from '../utils/validation.util';

export function IsValidUUID(
  fieldName: string,
  options?: DecoratorAdditionalOptions,
) {
  return applyDecorators(
    IsUUID(
      '4',
      ValidationUtil.createOptions({
        message: `${fieldName} should be a valid id`,
        errorCode: ValidationErrorCode.INVALID_ID,
        ...options,
      }),
    ),
  );
}
