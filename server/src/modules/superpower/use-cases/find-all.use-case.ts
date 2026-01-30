import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Superpower } from '../entities/superpower.entity';

@Injectable()
export class FindAllUseCase {
  constructor(
    @InjectRepository(Superpower)
    private readonly repository: Repository<Superpower>,
  ) {}
  async execute() {
    return await this.repository.find();
  }
}
