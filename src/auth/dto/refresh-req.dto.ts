import { ApiModelProperty } from '@nestjs/swagger';

export class RefreshRequestDto {
  @ApiModelProperty()
  token: string;
}
