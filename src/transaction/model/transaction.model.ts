import { ObjectId } from 'bson';
import { prop, Ref, Typegoose } from 'typegoose';
import { Account } from '../../account/model/account.model';
import { User } from '../../user/model/user.model';
import { TransactionCategory } from '../enums/transaction-category.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export class Transaction extends Typegoose {
  _id: ObjectId;

  @prop({ required: true })
  title: string;

  @prop({ required: true, ref: User })
  user: Ref<User>;

  @prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @prop({ required: true, enum: TransactionCategory })
  category: TransactionCategory;

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
