import { TransactionListItemDto } from './transaction-list-item.dto';
import { ApiResponseModelProperty } from '@nestjs/swagger';
import { PagerResponseDto } from '../../common/pager';
import { Transaction } from '../model/transaction.model';

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
