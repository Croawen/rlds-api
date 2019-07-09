import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, InstanceType } from 'typegoose';
import { Group } from './model/group.model';
import { CreateGroupDto, GroupListDto, GroupDetailsDto } from './dto';
import { ObjectId } from 'bson';
import { BaseService } from '../common/base.service';
import { PagerRequestDto } from '../common/pager';

@Injectable()
export class GroupService extends BaseService<Group> {
  constructor(@InjectModel(Group) groupModel: ModelType<Group>) {
    super(groupModel);
  }

  async createGroup(userId: string, dto: CreateGroupDto): Promise<void> {
    let group = await this.model.findOne({
      name: dto.name,
      user: new ObjectId(userId),
    });

    if (group)
      throw new HttpException('Group with provided name already exists.', 460);

    group = new this.model({
      ...dto,
      user: new ObjectId(userId),
    });

    await group.save();
  }

  async deleteGroup(userId: string, groupId: string): Promise<void> {
    const group = await this.getGroupEntity(userId, groupId);

    group.isDeleted = true;
    await group.save();
  }

  async getGroups(
    userId: string,
    pagerReq: PagerRequestDto,
  ): Promise<GroupListDto> {
    const res = await this.getPaged(pagerReq, {
      user: new ObjectId(userId),
      isDeleted: false,
    });
    return new GroupListDto(
      res.items,
      res.totalItems,
      pagerReq.pageSize,
      pagerReq.pageNumber,
    );
  }

  async getGroupDetails(
    userId: string,
    groupId: string,
  ): Promise<GroupDetailsDto> {
    const group = await this.getGroupEntity(userId, groupId);

    return new GroupDetailsDto(group);
  }

  private async getGroupEntity(
    userId: string,
    groupId: string,
  ): Promise<InstanceType<Group>> {
    const group = await this.model.findOne({
      _id: new ObjectId(groupId),
      user: new ObjectId(userId),
      isDeleted: false,
    });

    if (!group)
      throw new NotFoundException('Group with provided id was not found.');

    return group;
  }
}
