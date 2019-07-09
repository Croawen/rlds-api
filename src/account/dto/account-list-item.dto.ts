import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Account } from 'account/model/account.model';
import { Currency } from 'common/currencies';

export class AccountListItemDto {
  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  @ApiResponseModelProperty()
  balance: number;

  @ApiResponseModelProperty({ type: String })
  currency: Currency;

  constructor(entity: Account) {
    this.name = entity.name;
    this.description = entity.description;
    this.balance = entity.balance;
    this.currency = entity.currency;
  }
}
