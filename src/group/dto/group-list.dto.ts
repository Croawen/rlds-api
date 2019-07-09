import { ApiResponseModelProperty } from '@nestjs/swagger';
import { GroupListItemDto } from '../dto';
import { Group } from '../model/group.model';
import { PagerResponseDto } from '../../common/pager';

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
