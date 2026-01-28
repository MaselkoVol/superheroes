import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { HashingModule } from 'src/shared/hashing/hashing.module';
import { DoctorRepository } from './repositories/doctor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Module({
  imports: [HashingModule, TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
})
export class DoctorModule {}
