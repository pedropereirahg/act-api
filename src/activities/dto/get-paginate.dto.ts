import { ResponsePaginateDto } from '../../commons/dtos/response-paginate.dto';
import { GetDto } from './get.dto';

export class GetPaginateDto extends ResponsePaginateDto<GetDto> {
  constructor(data: GetDto[], count: number, page: number, pageSize: number) {
    super(GetDto.factory(data) as GetDto[], count, page, pageSize);
  }
}
