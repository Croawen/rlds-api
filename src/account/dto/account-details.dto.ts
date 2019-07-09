import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Account } from '../model/account.model';
import { Currency } from '../../common/currencies';
import { Group } from '../../group/model/group.model';

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

  constructor(entity: Account) {
    this.id = entity._id.toHexString();
    this.name = entity.name;
    this.description = entity.description;
    this.groupName = (entity.group as Group).name;
    this.balance = entity.balance;
    this.currency = entity.currency;
  }
}
