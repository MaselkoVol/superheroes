import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { ValidationErrorCode } from '../constants/error-codes.validation';
import { ValidationUtil } from '../utils/validation.util';

export function IsValidString(min: number, max: number, fieldName: string) {
  return applyDecorators(
    IsString(
      ValidationUtil.createOptions({
        message: `${fieldName} має бути рядком`,
        errorCode: ValidationErrorCode.NOT_STRING,
      }),
    ),
    MinLength(
      min,
      ValidationUtil.createOptions({
        message: `Поле ${fieldName} занадто коротке`,
        errorCode: ValidationErrorCode.TOO_SHORT,
        params: { min },
      }),
    ),
    MaxLength(
      max,
      ValidationUtil.createOptions({
        message: `Поле ${fieldName} занадто довге`,
        errorCode: ValidationErrorCode.TOO_LONG,
        params: { max },
      }),
    ),
  );
}
