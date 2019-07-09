import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PagerRequestDto {
  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  pageNumber?: number;
  @ApiModelPropertyOptional()
  @IsNumber()
  @IsOptional()
  pageSize?: number;

  constructor(pageNumber?: any, pageSize?: any) {
    this.pageNumber = pageNumber ? parseInt(pageNumber, 10) : 0;
    this.pageSize = pageSize ? parseInt(pageSize, 10) : 10;
  }
}
