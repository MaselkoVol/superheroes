import { ConfigType, registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '5000', 10),
}));

export type AppConfig = ConfigType<typeof appConfig>;
