import { Injectable } from '@nestjs/common';
import { PostgresErrorCode } from 'src/common/constants/error-codes.postgres';
import { ErrorUtil } from 'src/common/utils/error.util';
import { In } from 'typeorm';
import { QueryRunner } from 'typeorm/browser';
import { Superpower } from './entities/superpower.entity';
import { SuperpowerAlreadyExists } from './exceptions/superpower.exceptions';
import { SuperpowerMapper } from './mappers/superpower.mapper';

@Injectable()
export class SuperpowerService {
  getSuperpowerEntityIds(
    superpowers: Superpower[],
    newSuperpowers: Superpower[],
  ) {
    const currentIds = SuperpowerMapper.superpowersEntityIds(superpowers);
    const newIds = SuperpowerMapper.superpowersEntityIds(newSuperpowers);
    return [...currentIds, ...newIds];
  }

  async filterSuperpowers(queryRunner: QueryRunner, superpowerIds?: string[]) {
    if (!superpowerIds || superpowerIds.length === 0) return [];
    const manager = queryRunner.manager.getRepository(Superpower);

    const existingSuperpowers = await manager.find({
      where: { id: In(superpowerIds) },
    });

    return existingSuperpowers;
  }

  async createSuperpowers(queryRunner: QueryRunner, newSuperpowers: string[]) {
    try {
      const manager = queryRunner.manager.getRepository(Superpower);
      const payloads = SuperpowerMapper.toPayloads(newSuperpowers);
      const newSuperpowerEntities = manager.create(payloads);
      return await manager.save(newSuperpowerEntities);
    } catch (error) {
      if (ErrorUtil.hasCode(error, PostgresErrorCode.UNIQUE_VIOLATION)) {
        throw new SuperpowerAlreadyExists(error);
      }
      throw error;
    }
  }
}
