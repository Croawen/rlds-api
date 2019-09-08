import { ApiResponseModelProperty } from '@nestjs/swagger';
import { TransactionCategory } from '../enums/transaction-category.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { Transaction } from '../model/transaction.model';

export class TransactionDetailsDto {
  @ApiResponseModelProperty()
  id: string;

  @ApiResponseModelProperty()
  title: string;

  @ApiResponseModelProperty({ type: String })
  type: TransactionType;

  @ApiResponseModelProperty({ type: String })
  category: TransactionCategory;

  @ApiResponseModelProperty()
  createdAt: Date;

  @ApiResponseModelProperty()
  sourceAccount?: string;

  @ApiResponseModelProperty()
  targetAccount?: string;

  @ApiResponseModelProperty()
  sourceChange?: number;

  @ApiResponseModelProperty()
  targetChange?: number;

  constructor(entity: Transaction) {
    this.id = entity._id.toHexString();
    this.title = entity.title;
    this.type = entity.type;
    this.category = entity.category;
    this.createdAt = entity.createdAt;
    if (entity.sourceChange) {
      this.sourceAccount = ((entity.sourceAccount as unknown) as Account).name;
      this.sourceChange = entity.sourceChange;
    }
    if (entity.targetAccount) {
      this.targetAccount = ((entity.targetAccount as unknown) as Account).name;
      this.targetChange = entity.targetChange;
    }
  }
}
