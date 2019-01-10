import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CatsService } from './cats.service';

@Injectable()
export class CatByNamePipe implements PipeTransform<string> {
  constructor(private readonly catsService: CatsService) {}

  transform(value: string, metadata: ArgumentMetadata) {
    return this.catsService.findByName(value);
  }
}
