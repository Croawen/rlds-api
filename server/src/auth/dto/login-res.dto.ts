import { ApiResponseModelProperty } from '@nestjs/swagger';
import { TokenDto } from './token.dto';

export class LoginResponseDto {
  @ApiResponseModelProperty()
  accessToken: TokenDto;

  constructor(accessToken: TokenDto) {
    this.accessToken = accessToken;
  }
}
