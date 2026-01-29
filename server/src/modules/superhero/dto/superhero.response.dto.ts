import { Expose, Type } from 'class-transformer';
import { SuperpowerResponseDto } from 'src/modules/superpower/dto/superpower.response.dto';

export class ImageResponseDto {
  @Expose()
  id: string;

  @Expose()
  path: string;
}

export class SuperheroResponseDto {
  @Expose()
  id: string;

  @Expose()
  nickname: string;

  @Expose()
  realName: string;

  @Expose()
  originDescription: string;

  @Expose()
  catchPhrase: string;

  @Type(() => SuperpowerResponseDto)
  @Expose()
  superpowers: SuperpowerResponseDto[];

  @Type(() => ImageResponseDto)
  @Expose()
  images: ImageResponseDto[];
}
