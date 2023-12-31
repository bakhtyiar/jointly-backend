import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
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
  @MinLength(1, {
    message: 'Description is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Description is too long. Maximum length is $constraint1',
  })
  @Prop()
  description: string;

  @Prop({
    type: { type: SchemaMongoose.Types.ObjectId, ref: 'Chat' },
  })
  inCommunityId: Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
