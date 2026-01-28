import { AppErrorCode } from '../constants/error-codes.app';
import { BaseException } from './base.exception';

export class InternalServerErrorException extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Внутрішня помилка сервера',
      errorCode: AppErrorCode.INTERNAL_SERVER_ERROR,
      cause: cause,
    });
  }
}
