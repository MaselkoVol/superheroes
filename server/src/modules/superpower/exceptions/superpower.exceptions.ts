import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from 'src/common/constants/error-codes.app';
import { BaseException } from 'src/common/exceptions/base.exception';

export class NoSuperpowers extends BaseException {
  constructor() {
    super({
      message: 'A superhero should have superpowers',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: AppErrorCode.NO_SUPERPOWERS,
    });
  }
}

export class SuperpowerNotFound extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: `One of the superpowers doesn't exist`,
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: AppErrorCode.SUPERPOWER_NOT_FOUND,
      cause,
    });
  }
}

export class SuperpowerAlreadyExists extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Superpower already exists',
      statusCode: HttpStatus.CONFLICT,
      errorCode: AppErrorCode.SUPERPOWER_ALREADY_EXISTS,
      cause,
    });
  }
}
