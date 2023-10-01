import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ChangePasswordUserDto extends PartialType(CreateUserDto) {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsString()
  password: string;
}
