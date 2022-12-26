import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { Env } from './commons/environment/env';
import { DefaultExceptionsFilter } from './commons/filters/default-exception.filter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    MongooseModule.forRoot(Env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
