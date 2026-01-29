import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AppValidationPipe } from './common/pipes/app-validation.pipe';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { SuperheroModule } from './modules/superhero/superhero.module';
import { SuperpowerModule } from './modules/superpower/superpower.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    SuperheroModule,
    SuperpowerModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    { provide: APP_PIPE, useClass: AppValidationPipe },
  ],
})
export class AppModule {}
