import { DataSourceOptions } from 'typeorm';

// need to be a funcion because process.env will be undefined otherwise
export function getBaseDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '3333', 10),
    database: process.env.POSTGRES_DB || 'app_db',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    migrationsRun: false,
  };
}
