import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Account } from 'account/model/account.model';

export class AccountDetailsDto {
  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  constructor(entity: Account) {
    this.name = entity.name;
    this.description = entity.description;
  }
}
