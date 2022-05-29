import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsBoolean, ValidateNested, IsString } from 'class-validator';

import { Activity } from '../interfaces/activity.interface';
import { ActivityTypesEnum } from '../schemas/activities.schema';

export class ActivityOptionsDto {
  @IsString()
  @IsNotEmpty()
  statement: string;

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
  statement?: string;

  @ApiProperty({
    description: 'Options of resource',
    type: ActivityOptionsDto,
    example: [],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ActivityOptionsDto)
  options?: ActivityOptionsDto[];

  @ApiPropertyOptional({
    description: 'Type of resource',
    type: String,
    example: ActivityTypesEnum.essay,
    default: ActivityTypesEnum.essay,
    required: true,
  })
  @IsString()
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
