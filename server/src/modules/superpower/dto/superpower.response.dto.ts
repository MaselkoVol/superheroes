import { Expose } from 'class-transformer';

export class SuperpowerResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
