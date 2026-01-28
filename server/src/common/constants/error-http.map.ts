import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from './error-codes.app';

export const ErrorCodeToHttpMap: Record<AppErrorCode, HttpStatus> = {
  [AppErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [AppErrorCode.DOCTOR_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [AppErrorCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
};
