import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Activity } from '../interfaces/activity.interface';

export enum ActivityTypesEnum {
  essay = 'essay',
  multipleChoice = 'multiple-choice',
  singleChoice = 'single-choice',
}
export class Options {
  statement: string;

  isCorrect: boolean;
}

@Schema({ collection: 'activities', timestamps: true })
export class ActivitiesEntity extends Document implements Activity {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: false })
  title?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: true })
  statement: string;

  @Prop({ type: Array, required: false })
  options?: Options[];

  @Prop({
    type: ActivityTypesEnum,
    enum: Object.values(ActivityTypesEnum),
    default: ActivityTypesEnum.essay,
    required: true,
  })
  type: ActivityTypesEnum;

  @Prop({ type: Boolean, default: true, required: true })
  active: boolean;
}

export type ActivitiesDocument = ActivitiesEntity & Document;

export const ActivitiesSchema = SchemaFactory.createForClass(ActivitiesEntity);

ActivitiesSchema.index({ id: 1 }, { unique: true });
