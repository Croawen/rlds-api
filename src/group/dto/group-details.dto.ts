import { ApiResponseModelProperty } from '@nestjs/swagger';
import { Group } from '../model/group.model';

export class GroupDetailsDto {
  @ApiResponseModelProperty()
  id: string;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  description: string;

  constructor(entity: Group) {
    this.id = entity._id.toHexString();
    this.name = entity.name;
    this.description = entity.description;
  }
}
