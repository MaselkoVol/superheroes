import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/common/constants/error-codes.postgres';
import { ErrorUtil } from 'src/common/utils/error.util';
import { SuperpowerService } from 'src/modules/superpower/superpower.service';
import { DataSource, QueryRunner } from 'typeorm';
import { ImageService } from '../image/image.service';
import { Superpower } from '../superpower/entities/superpower.entity';
import {
  NoSuperpowers,
  SuperpowerNotFound,
} from '../superpower/exceptions/superpower.exceptions';
import { Superhero } from './entities/superhero.entity';
import {
  SuperheroAlreadyExists,
  SuperheroNotFound,
} from './exceptions/superhero.exceptions';
import {
  CreateSuperheroPayload,
  UpadteSuperheroPayload,
} from './interfaces/superhero.payloads';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly superpowerService: SuperpowerService,
    private readonly imageService: ImageService,
  ) {}

  async handleSuperpowers(
    queryRunner: QueryRunner,
    superpowerIds?: string[],
    newSuperpowers?: string[],
  ) {
    let superpowerEntities: Superpower[] = [];
    if (newSuperpowers) {
      superpowerEntities = await this.superpowerService.createSuperpowers(
        queryRunner,
        newSuperpowers,
      );
    }

    const filteredSuperpowers = await this.superpowerService.filterSuperpowers(
      queryRunner,
      superpowerIds,
    );
    const superpowerEntityIds = this.superpowerService.getSuperpowerEntityIds(
      filteredSuperpowers,
      superpowerEntities,
    );
    if (!superpowerEntityIds.length) {
      throw new NoSuperpowers();
    }
    return superpowerEntityIds;
  }

  async getSuperhero(id: string, queryRunner?: QueryRunner) {
    let manager = this.dataSource.manager.getRepository(Superhero);
    if (queryRunner) {
      manager = queryRunner.manager.getRepository(Superhero);
    }
    const superhero = await manager.findOne({
      where: { id },
      relations: ['superpowers', 'images'],
    });
    if (!superhero) {
      throw new SuperheroNotFound();
    }
    return superhero;
  }

  async updateSuperhero(
    queryRunner: QueryRunner,
    superhero: Superhero,
    payload: UpadteSuperheroPayload,
  ) {
    try {
      const manager = queryRunner.manager.getRepository(Superhero);
      return await manager.save({ ...superhero, ...payload });
    } catch (error: unknown) {
      if (ErrorUtil.hasCode(error, PostgresErrorCode.UNIQUE_VIOLATION)) {
        // Create a specific exception for Nickname collision
        throw new SuperheroAlreadyExists();
      }
      throw error;
    }
  }

  async createSuperhero(
    queryRunner: QueryRunner,
    payload: CreateSuperheroPayload,
  ) {
    try {
      const manager = queryRunner.manager.getRepository(Superhero);
      const superhero = manager.create(payload);
      return await manager.save(superhero);
    } catch (error) {
      if (ErrorUtil.hasCode(error, PostgresErrorCode.UNIQUE_VIOLATION)) {
        throw new SuperheroAlreadyExists(error);
      }
      if (
        ErrorUtil.hasCode(error, PostgresErrorCode.FOREIGN_KEY_VIOLATION) ||
        ErrorUtil.hasCode(error, PostgresErrorCode.INVALID_TEXT_REPRESENTATION)
      ) {
        throw new SuperpowerNotFound(error);
      }
      throw error;
    }
  }
}
