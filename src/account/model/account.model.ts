import { Typegoose, prop, Ref } from 'typegoose';
import { ObjectId } from 'bson';
import { Currency } from '../../common/currencies';
import { User } from '../../user/model/user.model';
import { Group } from '../../group/model/group.model';

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
  user: Ref<User>;

  @prop({ required: true, ref: Group })
  group: Ref<Group>;

  @prop({ default: 0 })
  transactionCount: number;

  @prop({ default: false })
  isDeleted: boolean;
}
