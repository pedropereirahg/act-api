import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsString,
  IsEnum,
} from 'class-validator';

import { Activity } from '../interfaces/activity.interface';
import { ActivityTypesEnum } from '../schemas/activities.schema';

export class ActivityOptionsDto {
  @ApiProperty({
    description: 'Statement of option',
    type: String,
    example: 'Excepteur sint occaecat cupidatat non proident',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  statement: string;

  @ApiProperty({
    description: 'Defines whether the option is correct or not',
    type: Boolean,
    example: true,
    default: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}

export class CreateDto implements Partial<Activity> {
  @ApiPropertyOptional({
    description: 'Title of resource',
    type: String,
    example: 'Lorem ipsum',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of resource',
    type: String,
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Statement of resource',
    type: String,
    example:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  statement: string;

  @ApiPropertyOptional({
    description: 'Options of resource',
    type: ActivityOptionsDto,
    example: [],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActivityOptionsDto)
  options?: ActivityOptionsDto[];

  @ApiProperty({
    description: 'Type of resource',
    type: String,
    example: ActivityTypesEnum.essay,
    default: ActivityTypesEnum.essay,
    required: true,
  })
  @IsEnum(ActivityTypesEnum, { each: true })
  @IsString()
  @IsNotEmpty()
  type: ActivityTypesEnum;

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
