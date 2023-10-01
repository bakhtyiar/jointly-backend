import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @MinLength(5, {
    message: 'Login is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Login is too long. Maximum length is $constraint1',
  })
  @Prop({ required: true, unique: true })
  login: string;

  @MinLength(1, {
    message: 'Name is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Name is too long. Maximum length is $constraint1',
  })
  @Prop()
  name: string;

  @IsStrongPassword()
  @Prop({ required: true, unique: true })
  password: string;

  @IsString()
  @Prop()
  avatar: string;

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

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Community' }] })
  communities: Types.ObjectId[];

  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
