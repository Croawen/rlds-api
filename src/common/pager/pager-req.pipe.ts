import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { PagerRequestDto } from '../pager';

export class ParsePagerRequestPipe
  implements PipeTransform<any, PagerRequestDto> {
  transform(value: any, metadata: ArgumentMetadata): PagerRequestDto {
    return new PagerRequestDto(value.pageNumber, value.pageSize);
  }
}
