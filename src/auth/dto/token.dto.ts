import { ApiResponseModelProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiResponseModelProperty()
  token: string;

  @ApiResponseModelProperty()
  expirationTimestamp: number;

  constructor(token: string, expirationTimestamp: Date) {
    this.token = token;
    this.expirationTimestamp = +expirationTimestamp;
  }
}
