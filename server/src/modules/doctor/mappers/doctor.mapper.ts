import { plainToInstance } from 'class-transformer';
import { DoctorResponseDto } from '../dto/doctor.response.dto';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorCommand } from '../interfaces/create-doctor.command';
import { CreateDoctorPayload } from '../interfaces/create-doctor.payload';

export class DoctorMapper {
  static toPayload(
    command: CreateDoctorCommand,
    encryptedPassword: string,
  ): CreateDoctorPayload {
    return {
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      encryptedPassword,
    };
  }

  static toResponse(entity: Doctor): DoctorResponseDto {
    return plainToInstance(DoctorResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
