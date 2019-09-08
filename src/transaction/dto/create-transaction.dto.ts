import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TransactionCategory } from '../enums/transaction-category.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelProperty({ enum: Object.values(TransactionType) })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiModelProperty({ enum: Object.values(TransactionCategory) })
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

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
