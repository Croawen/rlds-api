import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { PagerRequestDto } from './pager';

export abstract class BaseService<T extends Typegoose> {
  constructor(public readonly model: ModelType<T>) {}

  protected async getPaged(
    pagerReq: PagerRequestDto,
    findQuery = {},
    projectQuery = {},
  ): Promise<{ items: InstanceType<T>[]; totalItems: number }> {
    const totalItems = await this.model.countDocuments(findQuery);
    const items = await this.model
      .find(findQuery, projectQuery)
      .skip(pagerReq.pageNumber * pagerReq.pageSize)
      .limit(pagerReq.pageSize);
    return { items, totalItems };
  }
}
