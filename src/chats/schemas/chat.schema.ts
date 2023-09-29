import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  IsArray,
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
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => User)
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
