import { AppErrorCode } from 'src/common/constants/error-codes.app';
import { BaseException } from 'src/common/exceptions/base.exception';

export class DoctorAlreadyExistsException extends BaseException {
  constructor(cause?: unknown) {
    super({
      errorCode: AppErrorCode.DOCTOR_ALREADY_EXISTS,
      message: 'Лікар з такою електронною поштою вже зареєстрований у системі',
      cause: cause,
    });
  }
}
