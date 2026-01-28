import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig, AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get<AppConfig>(appConfig.KEY);

  await app.listen(config.port);
}
bootstrap();
