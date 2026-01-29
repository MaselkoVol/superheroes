import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ImageService } from 'src/modules/image/image.service';
import { DataSource } from 'typeorm';
import { ImageMapper } from '../../image/mappers/image.mapper';
import { UpdateSuperheroCommand } from '../interfaces/superhero.commands';
import { SuperheroMapper } from '../mappers/superhero.mapper';
import { SuperheroService } from '../superhero.service';
import { NoImage } from 'src/modules/image/exceptions/image.exceptions';

@Injectable()
export class UpdateUseCase {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly superheroService: SuperheroService,
    private readonly imageService: ImageService,
  ) {}
  async execute(command: UpdateSuperheroCommand) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const superhero = await this.superheroService.getSuperhero(
        command.id,
        queryRunner,
      );

      const superpowerEntityIds = await this.superheroService.handleSuperpowers(
        queryRunner,
        command.superpowerIds,
        command.newSuperpowers,
      );

      const filteredImageIds = this.imageService.filterImageIds(
        superhero,
        command.imageIds,
      );
      const imagesToRemove = this.imageService.getImagesToRemove(
        superhero,
        filteredImageIds,
      );
      await this.imageService.removeImages(queryRunner, imagesToRemove);

      let imageIds: string[] = filteredImageIds;

      if (command.newImagePaths) {
        const newImages = await this.imageService.createImages(
          queryRunner,
          superhero,
          command.newImagePaths,
        );
        const newImageIds = ImageMapper.imagesToIds(newImages);
        imageIds = [...imageIds, ...newImageIds];
      }

      const imageEntityIds = ImageMapper.idsToEntityIds(imageIds);
      if (!imageEntityIds.length) {
        throw new NoImage();
      }

      const payload = SuperheroMapper.toUpdatePayload(
        command,
        superpowerEntityIds,
        imageEntityIds,
      );

      await this.superheroService.updateSuperhero(
        queryRunner,
        superhero,
        payload,
      );
      const updatedSuperher = await this.superheroService.getSuperhero(
        command.id,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      const imagePaths = ImageMapper.imagesToPaths(imagesToRemove);
      await this.imageService.deleteImages(imagePaths);

      return updatedSuperher;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      if (command.newImagePaths) {
        await this.imageService.deleteImages(command.newImagePaths);
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
