import { IsOptional } from 'class-validator';
import { IsValidArray } from 'src/common/decorators/is-valid-array.decorator';
import { IsValidNumber } from 'src/common/decorators/is-valid-number.decorator';
import { IsValidString } from 'src/common/decorators/is-valid-string.decorator';
import { TransformStringIntoArray } from 'src/common/decorators/transform-string-into-array.decorator';

export class FindManySuperheroesQuery {
  @IsValidString('Superpower', 3, 100, { each: true })
  @IsValidArray('Superpowers', 1, 10)
  @TransformStringIntoArray()
  @IsOptional()
  superpowers?: string[];

  @IsValidString('Search', 1, 100)
  @IsOptional()
  nickname?: string;

  @IsValidNumber('Page', 1, undefined)
  page: number;

  @IsValidNumber('Limit', 1, 50)
  limit: number;
}
