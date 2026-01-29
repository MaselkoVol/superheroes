import { applyDecorators, UseFilters, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterExceptionFilter } from '../filters/multer-exception.filter';
import { FileUtil } from '../utils/file.util';
import { FileTooBig, InvalidFileType } from '../exceptions/file.exceptions';

export interface FilesUploadOptions {
  fieldName: string;
  maxCount: number;
  destination: string;
  sizeLimit: number;
  allowedFileTypes?: string;
}

export function FilesUpload(options: FilesUploadOptions) {
  return applyDecorators(
    UseFilters(
      new MulterExceptionFilter({
        fieldName: options.fieldName,
        sizeLimit: options.sizeLimit,
      }),
    ),
    UseInterceptors(
      FilesInterceptor(options.fieldName, options.maxCount, {
        storage: diskStorage({
          destination: options.destination,
          filename: (req, file, callback) => {
            const extention = extname(file.originalname);
            const name = FileUtil.generateRandomName(extention);
            callback(null, name);
          },
        }),
        limits: {
          fileSize: options.sizeLimit,
        },
        fileFilter: (req, file, callback) => {
          if (
            options.allowedFileTypes &&
            !file.mimetype.match(options.allowedFileTypes)
          ) {
            const exception = new InvalidFileType(
              options.fieldName,
              options.allowedFileTypes,
            );
            return callback(exception, false);
          }
          callback(null, true);
        },
      }),
    ),
  );
}
