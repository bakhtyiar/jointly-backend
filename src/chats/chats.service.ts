import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  create(createChatDto: CreateChatDto) {
    // todo: implement
    return 'This action adds a new chat';
  }

  findAll() {
    // todo: implement
    return `This action returns all chats`;
  }

  findOne(id: number) {
    // todo: implement
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    // todo: implement
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    // todo: implement
    return `This action removes a #${id} chat`;
  }
}
