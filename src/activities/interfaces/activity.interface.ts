import { ActivityTypesEnum } from '../schemas/activities.schema';

export interface Activity {
  id: string;
  title?: string;
  description?: string;
  statement: string;
  options?: Array<Record<string, any>>;
  type: ActivityTypesEnum;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}
