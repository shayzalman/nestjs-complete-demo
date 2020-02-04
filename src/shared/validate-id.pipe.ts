import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {Types} from 'mongoose';

@Injectable()
export class ValidateIdPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = Types.ObjectId.isValid(value);
        if (!isValid) {
            throw new BadRequestException('Invalid ID!');
        }
        return value;
    }
}
