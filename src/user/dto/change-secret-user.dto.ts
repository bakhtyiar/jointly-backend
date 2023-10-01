import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class ChangeSecretUserDto extends PartialType(CreateUserDto) {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsString()
  password: string;

  @IsOptional()
  @MinLength(1, {
    message: 'Secret question is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Secret question is too long. Maximum length is $constraint1',
  })
  @IsString()
  @Prop()
  secretQuestion: string;

  @MinLength(1, {
    message: 'Secret answer is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Secret answer is too long. Maximum length is $constraint1',
  })
  @IsString()
  @Prop()
  secretAnswer: string;
}
