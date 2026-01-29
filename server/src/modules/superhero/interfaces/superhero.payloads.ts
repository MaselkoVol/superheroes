import { EntityId } from 'src/common/interfaces/entity.interface';
import { Superhero } from '../entities/superhero.entity';

export type CreateSuperheroPayload = Omit<
  Superhero,
  'id' | 'superpowers' | 'images'
> & {
  superpowers: EntityId[];
};

export type UpadteSuperheroPayload = Partial<
  Omit<Superhero, 'images' | 'superpowers'>
> & {
  id: string;
  images: EntityId[];
  superpowers: EntityId[];
};

export interface SuperheroesResponseData {
  id: string;
  nickname: string;
  imageId: string;
  imagePath: string;
}

export interface SearchMetadata {
  page: number;
  limit: number;
  total: number;
}

export interface SuperheroesResponsePayload {
  data: SuperheroesResponseData[];
  metadata: SearchMetadata;
}
