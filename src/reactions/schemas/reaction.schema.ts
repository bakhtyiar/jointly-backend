import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

export type ReactionDocument = HydratedDocument<Reaction>;

@Schema()
export class Reaction {
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @IsString()
  @Prop({ required: true, unique: true })
  media: string;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
