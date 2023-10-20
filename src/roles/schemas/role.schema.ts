import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export type RoleDocument = HydratedDocument<Role>;

export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Permissions' }] })
  permissions: Types.ObjectId[];

  @ValidateIf((o) => o.isGlobal === false)
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Community' }] })
  forCommunities: Types.ObjectId[];

  @IsBoolean()
  @Prop()
  isGlobal: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
