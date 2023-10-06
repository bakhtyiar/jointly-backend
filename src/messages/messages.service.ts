import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  create(createMessageDto: CreateMessageDto) {
    // todo: implement
    return 'This action adds a new message';
  }

  findAll() {
    // todo: implement
    return `This action returns all messages`;
  }

  findOne(id: number) {
    // todo: implement
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    // todo: implement
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    // todo: implement
    return `This action removes a #${id} message`;
  }
}
