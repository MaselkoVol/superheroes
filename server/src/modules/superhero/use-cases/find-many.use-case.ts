import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, ILike, In } from 'typeorm';
import { Superhero } from '../entities/superhero.entity';
import { FindManySuperheroesCommand } from '../interfaces/superhero.commands';
import { SearchMetadata } from '../interfaces/superhero.payloads';
import { SuperheroMapper } from '../mappers/superhero.mapper';

@Injectable()
export class FindManyUseCase {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async execute(command: FindManySuperheroesCommand) {
    const limit = Math.floor(command.limit);
    const page = Math.floor(command.page);
    const repository = this.dataSource.manager.getRepository(Superhero);
    const [superheroes, total] = await repository.findAndCount({
      where: this.buildWhere(command.nickname, command.superpowers),
      relations: ['superpowers', 'images'],
      skip: (page - 1) * limit,
      take: limit,
      order: { nickname: 'DESC' },
    });

    const metadata: SearchMetadata = {
      limit,
      page,
      total,
    };

    return SuperheroMapper.manyToResponsePayload(superheroes, metadata);
  }

  buildWhere(nickname?: string, superpowers?: string[]) {
    const options: FindOptionsWhere<Superhero> = {};
    if (nickname) {
      options.nickname = ILike(`%${nickname}%`);
    }
    if (superpowers) {
      options.superpowers = { name: In(superpowers) };
    }
    return options;
  }
}
