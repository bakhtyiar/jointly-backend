import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '@src/chats/schemas/chat.schema';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(createChatDto: CreateChatDto) {
    const createdUser = await new this.chatModel(createChatDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.chatModel.find().exec();
  }

  async findOne(id: string) {
    return await this.chatModel.findById(id).exec();
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    return await this.chatModel.findOneAndUpdate(
      { _id: id },
      { ...updateChatDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.chatModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
