import {
  Controller,
  Inject,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto, GroupListDto, GroupDetailsDto } from './dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserPayload } from '../auth/interfaces/user.payload';
import { ParsePagerRequestPipe, PagerRequestDto } from '../common/pager';

@Controller('groups')
@ApiUseTags('Groups')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class GroupController {
  constructor(
    @Inject(GroupService) private readonly groupService: GroupService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create a new group.' })
  @ApiCreatedResponse({ description: 'New group has been created.' })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiResponse({
    status: 460,
    description: 'Group with this name already exists.',
  })
  async create(
    @CurrentUser() user: IUserPayload,
    @Body() dto: CreateGroupDto,
  ): Promise<void> {
    return this.groupService.createGroup(user.id, dto);
  }

  @Delete(':groupId')
  @ApiOperation({ title: 'Delete group with provided id.' })
  @ApiOkResponse({ description: 'Group deleted.' })
  @ApiNotFoundResponse({ description: 'Group not found.' })
  @ApiResponse({
    status: 460,
    description: 'Users can only delete their own groups.',
  })
  async delete(
    @CurrentUser() user: IUserPayload,
    @Param('groupId') groupId: string,
  ): Promise<void> {
    return this.groupService.deleteGroup(user.id, groupId);
  }

  @Get()
  @ApiOperation({ title: 'Get groups' })
  @ApiOkResponse({
    type: GroupListDto,
    description: 'Paged groups response.',
  })
  async get(
    @CurrentUser() user: IUserPayload,
    @Query(new ParsePagerRequestPipe()) query: PagerRequestDto,
  ): Promise<GroupListDto> {
    return this.groupService.getGroups(user.id, query);
  }

  @Get(':groupId')
  @ApiOperation({ title: 'Get group details.' })
  @ApiOkResponse({ type: GroupDetailsDto })
  @ApiNotFoundResponse({
    description: 'Group with provided id was not found.',
  })
  async getDetails(
    @CurrentUser() user: IUserPayload,
    @Param('groupId') groupId: string,
  ) {
    return this.groupService.getGroupDetails(user.id, groupId);
  }
}
