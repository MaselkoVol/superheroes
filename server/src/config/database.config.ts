import { ConfigType, registerAs } from '@nestjs/config';
import { getBaseDataSourceOptions } from './typeorm.config';

// decides wheather everything in the the database will be cleared every time the app starts
function getIsSynchronized() {
  const shoudSynchronize = process.env.POSTGRES_SYNCHRONIZE === 'true';
  const isProduction = process.env.NODE_ENV === 'production';

  return shoudSynchronize && !isProduction;
}

export const databaseConfig = registerAs('database', () => ({
  ...getBaseDataSourceOptions(),
  synchronize: getIsSynchronized(),
  autoLoadEntities: true,
}));

export type DatabaseConfig = ConfigType<typeof databaseConfig>;
