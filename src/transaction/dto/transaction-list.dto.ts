import { TransactionListItemDto } from './transaction-list-item.dto';
import { Transaction } from 'transaction/model/transaction.model';
import { ApiResponseModelProperty } from '@nestjs/swagger';
import { PagerResponseDto } from 'common/pager';

export class TransactionListDto {
  @ApiResponseModelProperty()
  items: TransactionListItemDto[];

  @ApiResponseModelProperty()
  pager: PagerResponseDto;

  constructor(
    items: Transaction[],
    totalItems: number,
    pageSize: number,
    pageNumber: number,
  ) {
    this.pager = new PagerResponseDto(pageNumber, pageSize, totalItems);
    this.items = items.map(it => new TransactionListItemDto(it));
  }
}
