import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PagerRequestDto {
  @ApiModelPropertyOptional()
  @IsNumber()
  pageNumber: number;
  @ApiModelPropertyOptional()
  @IsNumber()
  pageSize: number;

  constructor(pageNumber?: any, pageSize?: any) {
    this.pageNumber = pageNumber ? parseInt(pageNumber, 10) : 0;
    this.pageSize = pageSize ? parseInt(pageSize, 10) : 10;
  }
}
