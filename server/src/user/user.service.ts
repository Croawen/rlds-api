import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { User } from './model/user.model';
import { BaseService } from 'common/base.service';
import { RegisterRequestDto } from './dto';
import * as sha256 from 'sha256';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User) userModel: ModelType<User>) {
    super(userModel);
  }

  async register(dto: RegisterRequestDto) {
    let user = await this.model.findOne({
      login: dto.login,
    });

    if (user) throw new HttpException('User already exists.', 460);

    user = new this.model({
      login: dto.login,
      passwordHash: sha256(dto.password),
    });
    await user.save();
  }
}
