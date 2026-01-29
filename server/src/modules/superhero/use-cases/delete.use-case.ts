import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ImageService } from 'src/modules/image/image.service';
import { DataSource } from 'typeorm';
import { Image } from '../../image/entities/image.entity';
import { ImageMapper } from '../../image/mappers/image.mapper';
import { Superhero } from '../entities/superhero.entity';
import { DeleteSuperheroCommand } from '../interfaces/superhero.commands';
import { SuperheroService } from '../superhero.service';

@Injectable()
export class DeleteUseCase {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly superheroService: SuperheroService,
    private readonly imageService: ImageService,
  ) {}
  async execute(command: DeleteSuperheroCommand) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const superhero = await this.superheroService.getSuperhero(
        command.id,
        queryRunner,
      );
      const imagePaths = ImageMapper.imagesToPaths(superhero.images);

      if (superhero.images) {
        await queryRunner.manager.remove(Image, superhero.images);
      }
      await queryRunner.manager.remove(Superhero, superhero);
      await queryRunner.commitTransaction();

      await this.imageService.deleteImages(imagePaths);

      return superhero;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
