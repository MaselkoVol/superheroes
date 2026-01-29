import { EntityId } from 'src/common/interfaces/entity.interface';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';
import {
  CreateSuperheroCommand,
  FindManySuperheroesCommand,
  FindOneSuperheroCommand,
  UpdateSuperheroCommand,
} from '../interfaces/superhero.commands';
import {
  CreateSuperheroPayload,
  SearchMetadata,
  SuperheroesResponseData,
  SuperheroesResponsePayload,
  UpadteSuperheroPayload,
} from '../interfaces/superhero.payloads';
import { plainToInstance } from 'class-transformer';
import { Superhero } from '../entities/superhero.entity';
import { SuperheroResponseDto } from '../dto/superhero.response.dto';
import {
  UpdateSuperheroDto,
  UpdateSuperheroParams,
} from '../dto/update-superhero.dto';
import { DeleteSuperheroParams } from '../dto/delete-superhero.dto';
import { FindOneSuperheroParams } from '../dto/find-one-superhero.dto';
import { FindManySuperheroesQuery } from '../dto/find-many-superheroes.dto';
import { ManySuperheroesResponseDto } from '../dto/many-superheroes.response';

export class SuperheroMapper {
  static toCreateCommand(
    dto: CreateSuperheroDto,
    images?: Array<Express.Multer.File>,
  ): CreateSuperheroCommand {
    let files: Express.Multer.File[] = [];
    if (images) {
      files = images;
    }
    const paths = files.map((image) => image.path);
    return {
      imagePaths: paths,
      ...dto,
    };
  }

  static toUpdateCommand(
    params: UpdateSuperheroParams,
    dto: UpdateSuperheroDto,
    images?: Array<Express.Multer.File>,
  ): UpdateSuperheroCommand {
    let files: Express.Multer.File[] = [];
    if (images) {
      files = images;
    }
    const paths = files.map((image) => image.path);
    return {
      id: params.id,
      newImagePaths: paths,
      ...dto,
    };
  }

  static toDeleteCommand(
    params: DeleteSuperheroParams,
  ): UpdateSuperheroCommand {
    return { id: params.id };
  }

  static toFindOneCommand(
    params: FindOneSuperheroParams,
  ): FindOneSuperheroCommand {
    return { id: params.id };
  }

  static toFindManyCommand(
    query: FindManySuperheroesQuery,
  ): FindManySuperheroesCommand {
    return query;
  }

  static toCreatePayload(
    command: CreateSuperheroCommand,
    superpowerEntityIds: EntityId[],
  ): CreateSuperheroPayload {
    return {
      nickname: command.nickname,
      realName: command.realName,
      originDescription: command.originDescription,
      catchPhrase: command.catchPhrase,
      superpowers: superpowerEntityIds,
    };
  }

  static toUpdatePayload(
    command: UpdateSuperheroCommand,
    superpowerEntityIds: EntityId[],
    imageEntityIds: EntityId[],
  ): UpadteSuperheroPayload {
    return {
      id: command.id,
      nickname: command.nickname,
      realName: command.realName,
      originDescription: command.originDescription,
      catchPhrase: command.catchPhrase,
      superpowers: superpowerEntityIds,
      images: imageEntityIds,
    };
  }

  static toResponse(entity: Superhero): SuperheroResponseDto {
    return plainToInstance(SuperheroResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static manyToResponsePayload(
    entities: Superhero[],
    metadata: SearchMetadata,
  ): SuperheroesResponsePayload {
    const modifiedEntites: SuperheroesResponseData[] = entities.map(
      (entity) => ({
        id: entity.id,
        imageId: entity.images[0].id,
        imagePath: entity.images[0].path,
        nickname: entity.nickname,
      }),
    );
    return {
      data: modifiedEntites,
      metadata,
    };
  }

  static payloadOfManyToResponse(
    payload: SuperheroesResponsePayload,
  ): ManySuperheroesResponseDto {
    return plainToInstance(ManySuperheroesResponseDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
