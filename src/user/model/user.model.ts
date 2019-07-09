import { Typegoose, prop } from 'typegoose';
import { ObjectId } from 'bson';

export class User extends Typegoose {
  _id: ObjectId;

  @prop({ required: true, unique: true })
  login: string;

  @prop({ required: true })
  passwordHash: string;
}
