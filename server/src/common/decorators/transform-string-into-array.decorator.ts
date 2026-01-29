import { Transform } from 'class-transformer';

export function TransformStringIntoArray() {
  return Transform(({ value }): unknown => {
    if (Array.isArray(value)) return value;
    return typeof value === 'string' ? value.split(',') : value;
  });
}
