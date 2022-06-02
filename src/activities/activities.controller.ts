import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateDto } from './dto/create.dto';
import { FilterPaginateDto } from './dto/filter-paginate.dto';
import { GetDto } from './dto/get.dto';
import { GetPaginateDto } from './dto/get-paginate.dto';
import { UpdateDto } from './dto/update.dto';
import { ActivitiesService } from './activities.service';

@Controller('activities')
@ApiTags('Activities')
@ApiBearerAuth()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiCreatedResponse({ type: GetDto })
  async create(@Body() data: CreateDto, @Req() req: any): Promise<GetDto> {
    try {
      const dataCreated = await this.activitiesService.create(data);
      req.logger.log(`Activity id: ${dataCreated.id} created`);
      return GetDto.factory(dataCreated) as GetDto;
    } catch (error) {
      req.logger.error(error);
      throw error;
    }
  }

  @Get()
  @ApiOkResponse({ type: GetPaginateDto })
  async findAll(
    @Query(ValidationPipe) filterPaginateDto: FilterPaginateDto,
  ): Promise<GetPaginateDto> {
    const {
      page = 1,
      perPage = 20,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      search,
    } = filterPaginateDto;

    const pageNumber = Number(page);
    const pageSize = Number(perPage);

    const [resultQuery, count] = await this.activitiesService.findAll({
      page,
      pageSize,
      orderBy,
      orderDirection,
      search,
    });

    return new GetPaginateDto(resultQuery, count, pageNumber, pageSize);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetDto })
  async findOne(@Param('id') id: string): Promise<GetDto> {
    return GetDto.factory(await this.activitiesService.findOne(id)) as GetDto;
  }

  @Patch(':id')
  @ApiOkResponse({ type: GetDto })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDto,
    @Req() req: any,
  ): Promise<GetDto> {
    try {
      const dataUpdated = await this.activitiesService.update(id, data);
      req.logger.log(`Activity id: ${dataUpdated.id} updated`);
      return GetDto.factory(dataUpdated) as GetDto;
    } catch (error) {
      req.logger.error(error);
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.activitiesService.remove(id);
  }
}
