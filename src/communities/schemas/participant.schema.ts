import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose, Types } from 'mongoose';
import { User } from '@src/user/schemas/user.schema';
import { IsString } from 'class-validator';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema()
export class Participant {
  @Prop()
  @IsString()
  avatar: string;
  @Prop({
    type: SchemaMongoose.Types.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;
  @Prop({ type: String })
  communityAvatar: string;
  @Prop({ type: String })
  communityName: string;
  @Prop({ type: String })
  communityStatus: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
