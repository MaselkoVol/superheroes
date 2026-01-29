import { IsValidArray } from 'src/common/decorators/is-valid-array.decorator';
import { IsValidString } from 'src/common/decorators/is-valid-string.decorator';
import { IsOptional } from 'class-validator';
import { TransformIntoArray } from 'src/common/decorators/transform-into-array.decorator';

export class CreateSuperheroDto {
  @IsValidString('Nickname', 1, 50)
  nickname: string;

  @IsValidString('Real name', 2, 50)
  realName: string;

  @IsValidString('Origin description', 20, 500)
  originDescription: string;

  @IsValidString('Catch phrase', 5, 100)
  catchPhrase: string;

  @IsValidString('Superpower', 1, 500, { each: true })
  @IsValidArray('Superpowers', 1, 20)
  @TransformIntoArray()
  @IsOptional()
  superpowerIds: string[];

  @IsValidString('New superpower', 3, 100, { each: true })
  @IsValidArray('New superpowers', 1, 20)
  @TransformIntoArray()
  @IsOptional()
  newSuperpowers: string[];
}
