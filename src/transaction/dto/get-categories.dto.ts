import { ApiResponseModelProperty } from '@nestjs/swagger';
import { TransactionCategory } from '../enums/transaction-category.enum';

export class GetCategoriesDto {
  @ApiResponseModelProperty()
  categories: string[];

  constructor() {
    this.categories = Object.values(TransactionCategory);
  }
}
