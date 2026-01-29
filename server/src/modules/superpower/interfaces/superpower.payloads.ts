import { Superpower } from '../../superpower/entities/superpower.entity';

export type CreateSuperpowerPayload = Omit<Superpower, 'id'>;
