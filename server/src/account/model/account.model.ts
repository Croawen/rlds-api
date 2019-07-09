import { Typegoose, prop } from 'typegoose';
import { ObjectId } from 'bson';
import { User } from 'user/model/user.model';
import { Group } from 'group/model/group.model';
import { Currency } from 'common/currencies/currency.enum';

export class Account extends Typegoose {
  _id: ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ default: 0 })
  balance: number;

  @prop({ enum: Currency, required: true })
  currency: Currency;

  @prop({ required: true, ref: User })
  user: ObjectId | User;

  @prop({ required: true, ref: Group })
  group: ObjectId | Group;

  @prop({ default: 0 })
  transactionCount: number;

  @prop({ default: false })
  isDeleted: boolean;
}
