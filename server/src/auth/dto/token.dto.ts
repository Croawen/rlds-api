import { ApiResponseModelProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiResponseModelProperty()
  token: string;

  @ApiResponseModelProperty()
  expirationTimestamp: Date;

  constructor(token: string, expirationTimestamp: Date) {
    this.token = token;
    this.expirationTimestamp = expirationTimestamp;
  }
}
