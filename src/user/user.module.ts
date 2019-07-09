import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './model/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GroupModule } from '../group/group.module';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [TypegooseModule.forFeature([User]), GroupModule],
  providers: [UserService],
})
export class UserModule {}
