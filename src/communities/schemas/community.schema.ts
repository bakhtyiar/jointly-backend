import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import { User } from '@src/user/schemas/user.schema';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Chat } from '@src/chats/schemas/chat.schema';
import { Participant } from '@src/communities/schemas/participant.schema';

export type CommunityDocument = HydratedDocument<Community>;

@Schema()
export class Community {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsString()
  avatar: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Participant)
  @Prop([{ type: Participant.name }])
  participants: Participant[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Participant)
  @Prop([{ type: Participant.name }])
  owners: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => User)
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: User.name }])
  blockedUsers: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => User)
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: Chat.name }])
  chats: Types.ObjectId[];

  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
