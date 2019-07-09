import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { PagerRequestDto } from './pager';

export abstract class BaseService<T extends Typegoose> {
  constructor(public readonly model: ModelType<T>) {}

  protected async getPaged(
    pagerReq: PagerRequestDto,
    findQuery = {},
    projectQuery = {},
    populate?: string | Object[],
  ): Promise<{ items: InstanceType<T>[]; totalItems: number }> {
    const totalItems = await this.model.countDocuments(findQuery);
    let query = this.model
      .find(findQuery, projectQuery)
      .skip(pagerReq.pageNumber * pagerReq.pageSize)
      .limit(pagerReq.pageSize);

    if (populate) query = query.populate(populate);

    const items = await query;
    return { items, totalItems };
  }
}
