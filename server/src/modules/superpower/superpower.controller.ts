import { Controller, Get } from '@nestjs/common';
import { SuperpowerMapper } from './mappers/superpower.mapper';
import { FindAllUseCase } from './use-cases/find-all.use-case';

@Controller('superpowers')
export class SuperpowerController {
  constructor(private readonly findAllUseCase: FindAllUseCase) {}

  @Get()
  async findAll() {
    const superpowers = await this.findAllUseCase.execute();
    return SuperpowerMapper.toResponseArray(superpowers);
  }
}
