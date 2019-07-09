import { PagerResponseDto } from 'common/pager';
import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Group } from 'group/model/group.model';
import { GroupListItemDto } from '.';

export class GroupListDto {
  @ApiResponseModelProperty()
  items: GroupListItemDto[];

  @ApiResponseModelProperty()
  pager: PagerResponseDto;

  constructor(
    items: Group[],
    totalItems: number,
    pageSize: number,
    pageNumber: number,
  ) {
    this.pager = new PagerResponseDto(pageNumber, pageSize, totalItems);
    this.items = items.map(it => new GroupListItemDto(it));
  }
}
