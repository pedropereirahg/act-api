import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ActivityTypesEnum } from '../schemas/activities.schema';

import { CreateDto } from './create.dto';

export class UpdateDto extends CreateDto {
  @ApiProperty({
    description: 'Statement of resource',
    type: String,
    example:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    required: false,
  })
  @IsString()
  @IsOptional()
  statement: string;

  @ApiPropertyOptional({
    description: 'Type of resource',
    type: String,
    example: ActivityTypesEnum.essay,
    default: ActivityTypesEnum.essay,
    required: false,
  })
  @IsString()
  @IsOptional()
  type: ActivityTypesEnum;
}
