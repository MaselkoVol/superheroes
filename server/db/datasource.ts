import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { getBaseDataSourceOptions } from '../src/config/typeorm.config';

config();

const entitiesPath = join(__dirname, '../src/**/*.entity.{js,ts}');
const migrationsPath = join(__dirname, 'migrations/*.{js,ts}');

const dataSourceOptions: DataSourceOptions = {
  ...getBaseDataSourceOptions(),
  migrations: [migrationsPath],
  entities: [entitiesPath],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
