import { EntityId } from 'src/common/interfaces/entity.interface';
import { Image } from '../entities/image.entity';
import { Superhero } from '../../superhero/entities/superhero.entity';
import { CreateImagePayload } from '../interfaces/image.payloads';

export class ImageMapper {
  static toPayloads(
    imagePaths: string[],
    superhero: Superhero,
  ): CreateImagePayload[] {
    return imagePaths.map((path) => ({
      path,
      superhero,
    }));
  }
  static imagesToPaths(images: Image[]): string[] {
    return images.map((image) => image.path);
  }
  static imagesToIds(images: Image[]): string[] {
    return images.map((image) => image.id);
  }

  static idsToEntityIds(ids: string[]): EntityId[] {
    return ids.map((id) => ({ id }));
  }

  static imagesToEntityIds(images: Image[]): EntityId[] {
    return images.map((image) => ({ id: image.id }));
  }
}
