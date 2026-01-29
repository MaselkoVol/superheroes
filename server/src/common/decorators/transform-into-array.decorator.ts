import { Transform } from 'class-transformer';

export function TransformIntoArray() {
  return Transform(({ value }): unknown => {
    if (value === undefined || value === null) {
      return value;
    }
    return Array.isArray(value) ? value : [value];
  });
}
