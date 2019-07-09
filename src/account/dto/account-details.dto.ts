import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Account } from '../model/account.model';

export class AccountDetailsDto {
  @ApiResponseModelProperty()
  id: string;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  constructor(entity: Account) {
    this.id = entity._id.toHexString();
    this.name = entity.name;
    this.description = entity.description;
  }
}
