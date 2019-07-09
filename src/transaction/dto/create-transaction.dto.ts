import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsString,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { TransactionType } from 'transaction/enums/transaction-type.enum';

export class CreateTransactionDto {
  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelProperty({ enum: Object.values(TransactionType) })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiModelProperty()
  @IsMongoId()
  @ValidateIf(
    o =>
      o.type === TransactionType.WITHDRAW ||
      o.type === TransactionType.TRANSFER,
  )
  sourceAccount: string;

  @ApiModelProperty()
  @IsMongoId()
  @ValidateIf(
    o =>
      o.type === TransactionType.DEPOSIT || o.type === TransactionType.TRANSFER,
  )
  targetAccount: string;

  @ApiModelProperty()
  @IsNumber()
  amount: number;
}
