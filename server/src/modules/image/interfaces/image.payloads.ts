import { Image } from '../entities/image.entity';

export type CreateImagePayload = Omit<Image, 'id'>;
