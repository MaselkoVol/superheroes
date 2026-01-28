import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { CreateDoctorCommand } from './interfaces/create-doctor.command';
import { DoctorMapper } from './mappers/doctor.mapper';
import { DoctorRepository } from './repositories/doctor.repository';

@Injectable()
export class DoctorService {
  constructor(
    private readonly repository: DoctorRepository,
    private readonly hashingService: HashingService,
  ) {}
  async create(data: CreateDoctorCommand) {
    const encryptedPassword = await this.hashingService.hash(data.password);
    const entityData = DoctorMapper.toPayload(data, encryptedPassword);
    return await this.repository.create(entityData);
  }
}
