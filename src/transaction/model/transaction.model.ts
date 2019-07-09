import { ObjectId } from 'bson';
import { prop, Typegoose, Ref } from 'typegoose';
import { Account } from 'account/model/account.model';
import { TransactionType } from 'transaction/enums/transaction-type.enum';

export class Transaction extends Typegoose {
  _id: ObjectId;

  @prop({ required: true })
  title: string;

  @prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @prop({ required: true })
  createdAt: Date;

  @prop({ default: null, ref: Account })
  sourceAccount: Ref<Account>;

  @prop({ default: null, ref: Account })
  targetAccount: Ref<Account>;

  @prop({ required: true })
  sourceChange: number;

  @prop({ required: true })
  targetChange: number;
}
