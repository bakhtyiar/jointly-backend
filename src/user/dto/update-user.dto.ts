import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { Schema as SchemaMongoose, Types } from 'mongoose';
import { Community } from '@src/communities/schemas/community.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Login is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Login is too long. Maximum length is $constraint1',
  })
  @Prop({ required: true, unique: true })
  login: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Name is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Name is too long. Maximum length is $constraint1',
  })
  @Prop()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @IsString()
  @Prop()
  avatar: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Secret question is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Secret question is too long. Maximum length is $constraint1',
  })
  @Prop()
  secretQuestion: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Secret answer is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Secret answer is too long. Maximum length is $constraint1',
  })
  @Prop()
  secretAnswer: string;

  @IsOptional()
  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Prop({
    type: [{ type: SchemaMongoose.Types.ObjectId, ref: Community.name }],
  })
  communities: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}
