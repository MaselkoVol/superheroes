import { Injectable } from '@nestjs/common';
import { FilesystemUtil } from 'src/common/utils/filesystem.util';
import { QueryRunner } from 'typeorm';
import { Superhero } from '../superhero/entities/superhero.entity';
import { ImageMapper } from './mappers/image.mapper';
import { ErrorUtil } from 'src/common/utils/error.util';
import { PostgresErrorCode } from 'src/common/constants/error-codes.postgres';
import { ImageAlreadyExists } from './exceptions/image.exceptions';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  filterImageIds(superhero: Superhero, imageIds?: string[]) {
    if (!imageIds) return [];
    const superheroImageIds = superhero.images.map((image) => image.id);
    return imageIds.filter((id) => superheroImageIds.includes(id));
  }
  getImagesToRemove(superhero: Superhero, filteredImageIds: string[]) {
    const imagesToRemove = superhero.images.filter(
      (image) => !filteredImageIds.includes(image.id),
    );
    return imagesToRemove;
  }

  async removeImages(queryRunner: QueryRunner, images: Image[]) {
    if (!images.length) return;
    const imageEntityIds = ImageMapper.imagesToEntityIds(images);
    const manager = queryRunner.manager.getRepository(Image);
    await manager.delete(imageEntityIds);
  }

  async deleteImages(paths: string[]) {
    try {
      await FilesystemUtil.deleteFilesCwd(paths);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async createImages(
    queryRunner: QueryRunner,
    superhero: Superhero,
    paths: string[],
  ) {
    try {
      const manager = queryRunner.manager.getRepository(Image);
      const pyaloads = ImageMapper.toPayloads(paths, superhero);
      const images = manager.create(pyaloads);
      return await manager.save(images);
    } catch (error: unknown) {
      if (ErrorUtil.hasCode(error, PostgresErrorCode.UNIQUE_VIOLATION)) {
        throw new ImageAlreadyExists(error);
      }
      throw error;
    }
  }
}
