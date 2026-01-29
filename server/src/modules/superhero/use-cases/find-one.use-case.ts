import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindOneSuperheroCommand } from '../interfaces/superhero.commands';
import { SuperheroService } from '../superhero.service';

@Injectable()
export class FindOneUseCase {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly superheroService: SuperheroService,
  ) {}

  async execute(command: FindOneSuperheroCommand) {
    const { id } = command;
    const superhero = await this.superheroService.getSuperhero(id);
    return superhero;
  }
}
