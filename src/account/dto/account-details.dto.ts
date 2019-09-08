import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Currency } from '../../common/currencies';
import { Group } from '../../group/model/group.model';
import { Account } from '../model/account.model';

export class AccountDetailsDto {
  @ApiResponseModelProperty()
  id: string;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  @ApiResponseModelProperty()
  groupName: string;

  @ApiResponseModelProperty()
  balance: number;

  @ApiResponseModelProperty({ type: String })
  currency: Currency;

  @ApiResponseModelProperty()
  transactionCount: number;

  constructor(entity: Account) {
    this.id = entity._id.toHexString();
    this.name = entity.name;
    this.description = entity.description;
    this.groupName = (entity.group as Group).name;
    this.balance = entity.balance;
    this.currency = entity.currency;
    this.transactionCount = entity.transactionCount;
  }
}
