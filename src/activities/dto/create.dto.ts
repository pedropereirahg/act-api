import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

import { Activity } from '../interfaces/activity.interface';
import { ActivityTypesEnum } from '../schemas/activities.schema';

export class CreateDto implements Partial<Activity> {
  @ApiPropertyOptional({
    description: 'Title of resource',
    type: String,
    example: 'Lorem ipsum',
    required: false,
  })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of resource',
    type: String,
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Statement of resource',
    type: String,
    example:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    required: true,
  })
  @IsNotEmpty()
  statement?: string;

  @ApiProperty({
    description: 'Options of resource',
    type: Array,
    example: [],
    required: false,
  })
  @IsOptional()
  options?: Array<Record<string, any>>;

  @ApiPropertyOptional({
    description: 'Type of resource',
    type: String,
    example: ActivityTypesEnum.essay,
    default: ActivityTypesEnum.essay,
    required: true,
  })
  @IsNotEmpty()
  type?: ActivityTypesEnum;

  @ApiPropertyOptional({
    description: 'Defines whether the resource is active or not',
    type: Boolean,
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
