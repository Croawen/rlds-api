import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class EditAccountDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsString()
  description: string;
}
