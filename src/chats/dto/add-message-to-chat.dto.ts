import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { IsMongoId, IsObject } from 'class-validator';
import { MessageDocument } from '@src/messages/schemas/message.schema';
import { Types } from 'mongoose';

export class AddMessageToChatDto extends PartialType(CreateChatDto) {
  @IsMongoId()
  chat_id: Types.ObjectId;

  @IsObject()
  message: MessageDocument;
}
