import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';
import { Currency } from '../../common/currencies';

export class CreateAccountDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsMongoId()
  group: string;

  @ApiModelProperty({ enum: Object.values(Currency) })
  @IsEnum(Currency)
  currency: Currency;
}
