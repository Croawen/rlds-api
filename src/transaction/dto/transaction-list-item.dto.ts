import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Account } from '../../account/model/account.model';
import { TransactionCategory } from '../enums/transaction-category.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { Transaction } from '../model/transaction.model';

export class TransactionListItemDto {
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
  sourceAccount: string;

  @ApiResponseModelProperty()
  targetAccount: string;

  @ApiResponseModelProperty()
  sourceChange: number;

  @ApiResponseModelProperty()
  targetChange: number;

  constructor(entity: Transaction) {
    this.id = entity._id.toHexString();
    this.title = entity.title;
    this.type = entity.type;
    this.category = entity.category;
    this.createdAt = entity.createdAt;
    this.sourceAccount = entity.sourceAccount
      ? (entity.sourceAccount as Account).name
      : null;
    this.targetAccount = entity.targetAccount
      ? (entity.targetAccount as Account).name
      : null;
    this.sourceChange = entity.sourceChange;
    this.targetChange = entity.targetChange;
  }
}
