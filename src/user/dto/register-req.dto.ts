import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  password: string;
}
