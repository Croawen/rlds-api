import { ApiResponseModelProperty } from '@nestjs/swagger';

export class PagerResponseDto {
  @ApiResponseModelProperty()
  pageNumber: number;
  @ApiResponseModelProperty()
  pageSize: number;
  @ApiResponseModelProperty()
  totalItems: number;
  @ApiResponseModelProperty()
  pageCount: number;

  constructor(pageNumber: number, pageSize: number, totalItems: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.pageCount = Math.max(Math.round(totalItems / pageSize), 1);
  }
}
