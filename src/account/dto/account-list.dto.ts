import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Account } from '../model/account.model';
import { AccountListItemDto } from './account-list-item.dto';
import { PagerResponseDto } from '../../common/pager';

export class AccountListDto {
  @ApiResponseModelProperty()
  items: AccountListItemDto[];

  @ApiResponseModelProperty()
  pager: PagerResponseDto;

  constructor(
    items: Account[],
    totalItems: number,
    pageSize: number,
    pageNumber: number,
  ) {
    this.pager = new PagerResponseDto(pageNumber, pageSize, totalItems);
    this.items = items.map(it => new AccountListItemDto(it));
  }
}
