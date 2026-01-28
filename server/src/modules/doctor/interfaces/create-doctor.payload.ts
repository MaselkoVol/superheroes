import { Doctor } from '../entities/doctor.entity';

export type CreateDoctorPayload = Omit<
  Doctor,
  'id' | 'createdAt' | 'updatedAt'
>;
