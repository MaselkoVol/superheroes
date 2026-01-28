import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/common/constants/error-codes.postgres';
import { hasSpecificCode } from 'src/common/utils/error.utils';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { DoctorAlreadyExistsException } from '../exceptions/doctor-already-exists.exception';
import { CreateDoctorPayload } from '../interfaces/create-doctor.payload';

@Injectable()
export class DoctorRepository {
  constructor(
    @InjectRepository(Doctor) private readonly repository: Repository<Doctor>,
  ) {}
  // write user to the database, if the email is unique
  async create(data: CreateDoctorPayload) {
    const newDoctor = this.repository.create(data);
    try {
      return await this.repository.save(newDoctor);
    } catch (error: unknown) {
      if (hasSpecificCode(error, PostgresErrorCode.UNIQUE_VIOLATION)) {
        throw new DoctorAlreadyExistsException(error);
      }
      throw error;
    }
  }
}
