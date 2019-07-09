import { Typegoose, prop, Ref } from 'typegoose';
import { ObjectId } from 'bson';
import { User } from '../../user/model/user.model';

export class Group extends Typegoose {
  _id: ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true, ref: User })
  user: Ref<User>;

  @prop({ default: false })
  isDeleted: boolean;
}
