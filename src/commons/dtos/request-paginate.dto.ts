import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestPaginateDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderBy: string;

  @ApiPropertyOptional()
  orderDirection: string;
}
