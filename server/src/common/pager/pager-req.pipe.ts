import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { PagerRequestDto } from '.';

export class ParsePagerRequestPipe
  implements PipeTransform<any, PagerRequestDto> {
  transform(value: any, metadata: ArgumentMetadata): PagerRequestDto {
    return new PagerRequestDto(value.pageNumber, value.pageSize);
  }
}
