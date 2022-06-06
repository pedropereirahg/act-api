import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { RequestPaginateDto } from '../../commons/dtos/request-paginate.dto';

export class FilterPaginateDto extends RequestPaginateDto {
  @ApiProperty({
    description: 'Query to search',
    type: String,
    required: false,
  })
  @IsOptional()
  search?: string;
}
