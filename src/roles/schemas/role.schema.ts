import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export type RoleDocument = HydratedDocument<Role>;

export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Prop({
    type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Permission' }],
  })
  permissions: Types.ObjectId[];

  @ValidateIf((o) => o.isGlobal === false)
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Prop({
    type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Community' }],
  })
  forCommunities: Types.ObjectId[];

  @ValidateIf((o) => o.isGlobal === false)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Chat' }] })
  forChats: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  @Prop()
  isGlobal: boolean;

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
