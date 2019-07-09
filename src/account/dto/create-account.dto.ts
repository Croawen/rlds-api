import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsEnum,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
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

  @ApiModelProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  @Max(99999)
  balance: number;
}
