import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ImageService } from 'src/modules/image/image.service';
import { DataSource } from 'typeorm';
import { NoImage } from '../../image/exceptions/image.exceptions';
import { CreateSuperheroCommand } from '../interfaces/superhero.commands';
import { SuperheroMapper } from '../mappers/superhero.mapper';
import { SuperheroService } from '../superhero.service';

@Injectable()
export class CreateUseCase {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly superheroService: SuperheroService,
    private readonly imageService: ImageService,
  ) {}
  async execute(command: CreateSuperheroCommand) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const superpowerEntityIds = await this.superheroService.handleSuperpowers(
        queryRunner,
        command.superpowerIds,
        command.newSuperpowers,
      );
      const superheroPayload = SuperheroMapper.toCreatePayload(
        command,
        superpowerEntityIds,
      );

      const superhero = await this.superheroService.createSuperhero(
        queryRunner,
        superheroPayload,
      );

      if (!command.imagePaths || !command.imagePaths.length) {
        throw new NoImage();
      }
      await this.imageService.createImages(
        queryRunner,
        superhero,
        command.imagePaths,
      );

      const createdSuperhero = await this.superheroService.getSuperhero(
        superhero.id,
        queryRunner,
      );
      await queryRunner.commitTransaction();

      return createdSuperhero;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      await this.imageService.deleteImages(command.imagePaths);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
