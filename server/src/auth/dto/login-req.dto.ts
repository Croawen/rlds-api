import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiModelProperty()
  @IsString()
  login: string;

  @ApiModelProperty()
  @IsString()
  password: string;
}
