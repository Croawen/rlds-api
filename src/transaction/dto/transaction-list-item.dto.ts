import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Transaction } from 'transaction/model/transaction.model';
import { TransactionType } from 'transaction/enums/transaction-type.enum';
import { Account } from 'account/model/account.model';

export class TransactionListItemDto {
  @ApiResponseModelProperty()
  title: string;

  @ApiResponseModelProperty({ type: String })
  type: TransactionType;

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
    this.title = entity.title;
    this.type = entity.type;
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
