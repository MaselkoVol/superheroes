export class ErrorUtil {
  static hasCode(obj: unknown, code: string): boolean {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'code' in obj &&
      obj.code === code
    );
  }

  static hasErrorCodeOption(obj: unknown): obj is { errorCode: string } {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'errorCode' in obj &&
      typeof obj['errorCode'] === 'string'
    );
  }

  static hasMessage(obj: unknown) {
    if (
      typeof obj === 'object' &&
      obj !== null &&
      'message' in obj &&
      typeof obj.message === 'string'
    ) {
      return true;
    }
    return false;
  }
}
