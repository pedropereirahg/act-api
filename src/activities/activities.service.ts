import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import {
  ActivitiesDocument,
  ActivitiesEntity,
} from './schemas/activities.schema';
import { Activity } from './interfaces/activity.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class ActivitiesService {
  constructor(
    @InjectModel(ActivitiesEntity.name)
    private activitiesModel: Model<ActivitiesDocument>,
  ) {}

  async create(data: Partial<Activity>): Promise<Activity> {
    const dataToSave = new this.activitiesModel({
      id: uuidV4(),
      ...data,
    });
    const dataSaved = await dataToSave.save();
    return dataSaved.toJSON();
  }

  async findAll({
    page,
    pageSize,
    orderBy,
    orderDirection,
    search,
    active,
  }): Promise<[Activity[], number]> {
    const filter: Record<string, any> = {};

    if (search) {
      filter.search = { $regex: `*${search}.*`, $options: 'i' };
    }

    if (active) {
      filter.active = active;
    }

    const sortBy = { [orderBy]: orderDirection === 'asc' ? 1 : -1 };
    const count = await this.activitiesModel.countDocuments(filter);
    const result = await this.activitiesModel
      .find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortBy)
      .lean();

    return [result, count];
  }

  async findOne(id: string): Promise<Activity> {
    const data = await this.activitiesModel.findOne({ id }).lean();

    if (!data) {
      throw new HttpException('Activity not found.', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async update(id: string, data: Partial<Activity>): Promise<Activity> {
    if (!(await this.activitiesModel.findOne({ id }).lean())) {
      throw new HttpException('Activity not found.', HttpStatus.NOT_FOUND);
    }

    return this.activitiesModel
      .findOneAndUpdate({ id }, data, {
        timestamps: true,
        new: true,
      })
      .lean();
  }

  async remove(id: string): Promise<void> {
    const data = await this.activitiesModel.findOne({ id });

    if (!data) {
      throw new HttpException('Activity not found.', HttpStatus.NOT_FOUND);
    }

    await this.activitiesModel.deleteOne({ id });
  }
}
