import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform(data: any, metadata: ArgumentMetadata) {
    const { value, error } = Joi.validate(data, this.schema);

    if (error) throw new BadRequestException(error.message);

    return value;
  }
}
