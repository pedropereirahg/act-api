import { ApiProperty } from '@nestjs/swagger';
import { instanceToInstance, plainToClass } from 'class-transformer';
import { IsDateString } from 'class-validator';

import { CreateDto } from './create.dto';

export class GetDto extends CreateDto {
  @ApiProperty({
    description: 'Identifier of resource',
    type: String,
    example: '0e70f8ba-2b7e-4c43-828c-8c5c9fee43c1',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Created date of resource',
    type: String,
    example: '2022-05-01T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  createdAt?: string;

  @ApiProperty({
    description: 'Updated date of resource',
    type: String,
    example: '2022-05-01T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  updatedAt?: string;

  public static factory(resultQuery: GetDto | GetDto[]): GetDto | GetDto[] {
    const resultQueryDto = plainToClass(GetDto, resultQuery, {
      excludePrefixes: ['_id', '__v'],
    });

    return instanceToInstance(resultQueryDto);
  }
}
