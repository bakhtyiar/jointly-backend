import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import { User } from '@src/user/schemas/user.schema';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'Participant' }])
  participants: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'Participant' }])
  owners: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => User)
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'User' }])
  blockedUsers: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => User)
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'Chat' }])
  chats: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
