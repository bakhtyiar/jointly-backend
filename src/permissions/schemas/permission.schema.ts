import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsBoolean, IsOptional } from 'class-validator';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  method: string;

  @IsOptional()
  @IsBoolean()
  @Prop()
  isDeleted: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
