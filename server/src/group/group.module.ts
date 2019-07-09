import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './model/group.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [GroupController],
  exports: [GroupService],
  imports: [TypegooseModule.forFeature([Group])],
  providers: [GroupService],
})
export class GroupModule {}
