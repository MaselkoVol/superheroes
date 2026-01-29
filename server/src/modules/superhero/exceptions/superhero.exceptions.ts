import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from 'src/common/constants/error-codes.app';
import { BaseException } from 'src/common/exceptions/base.exception';

export class SuperheroAlreadyExists extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Superhero already exists',
      statusCode: HttpStatus.CONFLICT,
      errorCode: AppErrorCode.SUPERHERO_ALREADY_EXISTS,
      cause,
    });
  }
}

export class SuperheroNotFound extends BaseException {
  constructor() {
    super({
      message: `Superhero with this id doesn't exist`,
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: AppErrorCode.SUPERHERO_NOT_FOUND,
    });
  }
}
