import { Module } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { SuperpowerController } from './superpower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superpower } from './entities/superpower.entity';
import { FindAllUseCase } from './use-cases/find-all.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Superpower])],
  controllers: [SuperpowerController],
  providers: [SuperpowerService, FindAllUseCase],
  exports: [SuperpowerService],
})
export class SuperpowerModule {}
