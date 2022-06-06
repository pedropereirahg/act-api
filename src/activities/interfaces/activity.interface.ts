import { ActivityTypesEnum } from '../schemas/activities.schema';

export interface Options {
  statement: string;
  isCorrect: boolean;
}

export interface Activity {
  id: string;
  title?: string;
  description?: string;
  statement: string;
  options?: Options[];
  type: ActivityTypesEnum;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}
