import { plainToInstance } from 'class-transformer';
import { Superpower } from '../entities/superpower.entity';
import { SuperpowerResponseDto } from '../dto/superpower.response.dto';
import { CreateSuperpowerPayload } from '../interfaces/superpower.payloads';
import { EntityId } from 'src/common/interfaces/entity.interface';

export class SuperpowerMapper {
  static toResponse(entity: Superpower): SuperpowerResponseDto {
    return plainToInstance(SuperpowerResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toResponseArray(entities: Superpower[]): SuperpowerResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }

  static toPayload(name: string): CreateSuperpowerPayload {
    return {
      name,
    };
  }
  static toPayloads(names: string[]): CreateSuperpowerPayload[] {
    return names.map((name) => this.toPayload(name));
  }

  static idToEntityId(id: string): EntityId {
    return {
      id,
    };
  }
  static idsToEntityIds(ids: string[]): EntityId[] {
    return ids.map((id) => this.idToEntityId(id));
  }

  static superpowerToEntityId(superpower: Superpower): EntityId {
    return {
      id: superpower.id,
    };
  }
  static superpowersEntityIds(superpowers: Superpower[]): EntityId[] {
    return superpowers.map((superpower) =>
      this.superpowerToEntityId(superpower),
    );
  }
}
