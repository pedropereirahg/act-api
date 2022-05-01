import { ApiProperty } from '@nestjs/swagger';

export abstract class ResponsePaginateDto<T> {
  @ApiProperty({
    example: [],
  })
  data: T[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  total: number;

  constructor(data: T[], totalItems: number, page: number, pageSize: number) {
    this.data = data;
    this.count = data.length;
    this.currentPage = page;
    this.perPage = pageSize;
    this.pages = Math.ceil(totalItems / this.perPage);
    this.total = totalItems;
  }
}
