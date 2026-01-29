import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { SuperheroController } from './superhero.controller';
import { CreateUseCase } from './use-cases/create.use-case';
import { DeleteUseCase } from './use-cases/delete.use-case';
import { FindOneUseCase } from './use-cases/find-one.use-case';
import { UpdateUseCase } from './use-cases/update.use-case';
import { SuperheroService } from './superhero.service';
import { SuperpowerModule } from '../superpower/superpower.module';
import { ImageModule } from '../image/image.module';
import { FindManyUseCase } from './use-cases/find-many.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Superhero]),
    SuperpowerModule,
    ImageModule,
  ],
  controllers: [SuperheroController],
  providers: [
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    FindOneUseCase,
    FindManyUseCase,
    SuperheroService,
  ],
})
export class SuperheroModule {}
