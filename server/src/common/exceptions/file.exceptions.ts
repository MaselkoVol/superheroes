import { ValidationErrorCode } from 'src/common/constants/error-codes.validation';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { FileUtil } from '../utils/file.util';

export class InvalidFileType extends ValidationException {
  constructor(fieldName: string, typesRegex: string) {
    const mimeTypes = typesRegex.replace(/image\/\(|\)/g, '');
    const formatedTypes = mimeTypes.replace(/\|/g, ', ');
    super([
      {
        field: fieldName,
        errorCode: ValidationErrorCode.INVALID_FILE_TYPE,
        message: `Invalid file type, try again with: ${formatedTypes}`,
        params: {
          mime: formatedTypes,
        },
      },
    ]);
  }
}

export class FileTooBig extends ValidationException {
  constructor(fieldName: string, maxSize: number) {
    const formattedSize = FileUtil.format(maxSize) || maxSize;
    super([
      {
        field: fieldName,
        errorCode: ValidationErrorCode.FILE_TOO_BIG,
        message: `File is too big, the limit is ${formattedSize}`,
        params: {
          max: formattedSize,
        },
      },
    ]);
  }
}

export class UnexpectedFile extends ValidationException {
  constructor(fieldName: string) {
    super([
      {
        field: fieldName,
        errorCode: ValidationErrorCode.UNEXPECTED_FILE,
        message: `File type is undexpected`,
      },
    ]);
  }
}
