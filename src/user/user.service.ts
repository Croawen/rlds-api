import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { User } from './model/user.model';
import { BaseService } from '../common/base.service';
import { RegisterRequestDto } from './dto';
import * as sha256 from 'sha256';
import { GroupService } from '../group/group.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User) userModel: ModelType<User>,
    @Inject(GroupService) private readonly groupService: GroupService,
  ) {
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

    const defaultGroup = new this.groupService.model({
      user: user._id,
      name: 'Default',
    });
    await defaultGroup.save();
  }
}
