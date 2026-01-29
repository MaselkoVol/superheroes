import { IsValidUUID } from 'src/common/decorators/is-valid-uuid.decorator';

export class DeleteSuperheroParams {
  @IsValidUUID('Id')
  id: string;
}
