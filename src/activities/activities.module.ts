import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ActivitiesEntity,
  ActivitiesSchema,
} from './schemas/activities.schema';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActivitiesEntity.name, schema: ActivitiesSchema },
    ]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
