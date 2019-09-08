import { ApiResponseModelProperty } from '@nestjs/swagger';
import { TransactionCategory } from '../enums/transaction-category.enum';

export class GetCategoriesDto {
  @ApiResponseModelProperty({ type: String })
  categories: TransactionCategory[];

  constructor() {
    this.categories = Object.values(TransactionCategory);
  }
}
