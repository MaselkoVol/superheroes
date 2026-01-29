import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { IsValidArray } from 'src/common/decorators/is-valid-array.decorator';
import { IsValidString } from 'src/common/decorators/is-valid-string.decorator';
import { TransformIntoArray } from 'src/common/decorators/transform-into-array.decorator';
import { CreateSuperheroDto } from './create-superhero.dto';
import { IsValidUUID } from 'src/common/decorators/is-valid-uuid.decorator';

export class UpdateSuperheroDto extends PartialType(CreateSuperheroDto) {
  @IsValidString('Images', 1, 500, { each: true })
  @IsValidArray('Images', 1, 20)
  @TransformIntoArray()
  @IsOptional()
  imageIds: string[];
}

export class UpdateSuperheroParams {
  @IsValidUUID('Id')
  id: string;
}
