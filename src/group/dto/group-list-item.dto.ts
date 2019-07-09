import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Group } from '../model/group.model';

export class GroupListItemDto {
  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  constructor(entity: Group) {
    this.name = entity.name;
  }
}
