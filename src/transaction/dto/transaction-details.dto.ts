import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Transaction } from '../model/transaction.model';

export class TransactionDetailsDto {
  @ApiResponseModelProperty()
  id: string;

  constructor(entity: Transaction) {
    this.id = entity._id.toHexString();
  }
}
