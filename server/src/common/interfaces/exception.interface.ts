import { AppErrorCode } from '../constants/error-codes.app';

export type ErrorParams = Record<string, string | number | boolean>;

export interface BaseExceptionOptions {
  message: string; // helper message
  errorCode: AppErrorCode; // special code for error
  params?: ErrorParams; // dynamic values for errorCode
  details?: unknown; // Additional information about the error
  cause?: unknown; // Original error for tracing bugs
}
