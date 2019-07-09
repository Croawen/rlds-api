import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsString, IsEnum } from 'class-validator';
import { TransactionType } from 'transaction/enums/transaction-type.enum';

export class CreateTransactionDto {
  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelProperty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiModelProperty()
  @IsMongoId()
  sourceAccount: string;

  @ApiModelProperty()
  @IsMongoId()
  targetAccount: string;

  @ApiModelProperty()
  @IsNumber()
  amount: number;
}
