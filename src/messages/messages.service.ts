import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '@src/messages/schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const createdUser = await new this.messageModel(createMessageDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.messageModel.find().exec();
  }

  async findOne(id: string) {
    return await this.messageModel.findById(id).exec();
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return await this.messageModel.findOneAndUpdate(
      { _id: id },
      { ...updateMessageDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.messageModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
