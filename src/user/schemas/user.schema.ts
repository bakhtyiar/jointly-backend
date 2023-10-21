import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
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
import { Community } from '@src/communities/schemas/community.schema';
import { Role } from '@src/roles/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  autoIndex: true, // <--
  autoCreate: true,
})
export class User {
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
  @MaxLength(50, {
    message: 'Status is too long. Maximum length is $constraint1',
  })
  @Prop()
  status: string;

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

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Prop({
    type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Community' }],
  })
  communities: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Role' }] })
  roles: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
