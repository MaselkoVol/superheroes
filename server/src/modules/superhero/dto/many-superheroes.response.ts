import { Expose, Type } from 'class-transformer';

export class MetadataResponseDto {
  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  total: number;
}

export class SuperheroResponseShortDto {
  @Expose()
  id: string;

  @Expose()
  nickname: string;

  @Expose()
  imageId: string;

  @Expose()
  imagePath: string;
}

export class ManySuperheroesResponseDto {
  @Type(() => SuperheroResponseShortDto)
  @Expose()
  data: SuperheroResponseShortDto[];

  @Type(() => MetadataResponseDto)
  @Expose()
  metadata: MetadataResponseDto;
}
