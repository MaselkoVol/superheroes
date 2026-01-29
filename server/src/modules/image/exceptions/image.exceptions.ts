import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from 'src/common/constants/error-codes.app';
import { BaseException } from 'src/common/exceptions/base.exception';

export class ImageAlreadyExists extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Image already exists',
      statusCode: HttpStatus.CONFLICT,
      errorCode: AppErrorCode.IMAGE_ALREADY_EXISTS,
      cause,
    });
  }
}

export class NoImage extends BaseException {
  constructor(cause?: unknown) {
    super({
      message: 'Superhero should have at least one image',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: AppErrorCode.NO_IMAGE,
      cause,
    });
  }
}
