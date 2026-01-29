import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FileTooBig, UnexpectedFile } from '../exceptions/file.exceptions';
import { GlobalExceptionFilter } from './global-exception.filter';

interface MulterFilterOptions {
  fieldName: string;
  sizeLimit?: number;
}

export class MulterExceptionFilter extends GlobalExceptionFilter {
  private options: MulterFilterOptions;
  constructor(options: MulterFilterOptions) {
    super();
    this.options = options;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      return super.catch(exception, host);
    }
    const actualStatus: number = exception.getStatus();
    const tooLargeStatus: number = HttpStatus.PAYLOAD_TOO_LARGE;
    const badRequestStatus: number = HttpStatus.BAD_REQUEST;

    if (actualStatus === tooLargeStatus && this.options.sizeLimit) {
      exception = new FileTooBig(
        this.options.fieldName,
        this.options.sizeLimit,
      );
    }
    if (actualStatus === badRequestStatus) {
      exception = new UnexpectedFile(this.options.fieldName);
    }
    super.catch(exception, host);
  }
}
