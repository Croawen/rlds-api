import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Group } from '../model/group.model';

export class GroupListItemDto {
  @ApiResponseModelProperty()
  id: string;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  @ApiResponseModelProperty()
  editable: boolean;

  constructor(entity: Group) {
    this.id = entity._id.toHexString();
    this.name = entity.name;
    this.description = entity.description;
    this.editable = entity.editable;
  }
}
