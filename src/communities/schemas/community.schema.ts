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
  @ArrayMinSize(1)
  // @Type(() => User)
  @Prop([
    {
      userId: {
        type: SchemaMongoose.Types.ObjectId,
        ref: 'User',
      },
      perms: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Permission' }],
    },
  ])
  participants: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => User)
  @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'User' }])
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

  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
