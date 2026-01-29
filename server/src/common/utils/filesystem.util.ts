import { join } from 'path';
import { unlink } from 'fs/promises';

export class FilesystemUtil {
  static deleteFilesCwd(relativePaths: string[]) {
    return Promise.allSettled(
      relativePaths.map(async (path) => {
        const storagePath = join(process.cwd(), path);
        await unlink(storagePath);
      }),
    );
  }
}
