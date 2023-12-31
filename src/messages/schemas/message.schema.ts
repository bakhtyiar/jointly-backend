import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NoEmptyString } from '@src/utilities/validators/NoEmptyString';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(46)
  @Type(() => String)
  @Prop({ validate: [NoEmptyString] })
  content: [string];

  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @IsDate()
  @Prop()
  creationTime: Date;

  @IsOptional()
  @IsDate()
  @Prop()
  lastEditTime: Date;

  @IsOptional()
  @Prop({ type: { type: SchemaMongoose.Types.ObjectId, ref: 'Message' } })
  replyTo: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Message' }] })
  replies: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Reaction' }] })
  reactions: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
