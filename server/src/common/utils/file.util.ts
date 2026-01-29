import * as bytes from 'bytes';
import { randomBytes } from 'crypto';

export class FileUtil {
  static format(value: number, options?: bytes.BytesOptions) {
    return bytes.format(value, options);
  }

  static parse(value: string): number {
    const result = bytes.parse(value);
    if (result === null) {
      // Return 0 or throw to avoid passing null to validators
      return 0;
    }
    return result;
  }

  static generateRandomName(extention: string) {
    const uniqueSuffix = Date.now();
    const randomHash = randomBytes(4).toString('hex'); // 8 characters
    return `${uniqueSuffix}-${randomHash}${extention}`;
  }
}
