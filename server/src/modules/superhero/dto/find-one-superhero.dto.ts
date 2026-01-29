import { IsValidUUID } from 'src/common/decorators/is-valid-uuid.decorator';

export class FindOneSuperheroParams {
  @IsValidUUID('Id')
  id: string;
}
