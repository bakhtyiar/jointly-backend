import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NoEmptyString } from '../../utilities/validators/NoEmptyString';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({
    required: true,
    type: { type: SchemaMongoose.Types.ObjectId, ref: 'Chat' },
  })
  inChatId: Types.ObjectId;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(46)
  @Type(() => String)
  @Prop({ required: true, validate: [NoEmptyString] })
  content: [string];

  @Prop({
    required: true,
    type: { type: SchemaMongoose.Types.ObjectId, ref: 'User' },
  })
  author: Types.ObjectId;

  @IsDate()
  @Prop({ required: true })
  creationTime: Date;

  @IsDate()
  @Prop()
  lastEditTime: Date;

  @Prop({ type: { type: SchemaMongoose.Types.ObjectId, ref: 'Message' } })
  replyTo: Types.ObjectId[];

  @IsArray()
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Message' }] })
  replies: Types.ObjectId[];

  @IsArray()
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Reaction' }] })
  reactions: Types.ObjectId[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
