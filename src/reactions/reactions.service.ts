import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction } from '@src/reactions/schemas/reaction.schema';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectModel(Reaction.name) private reactionModel: Model<Reaction>,
  ) {}

  async create(createReactionDto: CreateReactionDto) {
    const createdUser = await new this.reactionModel(createReactionDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.reactionModel.find().exec();
  }

  async findOne(id: string) {
    return await this.reactionModel.findById(id).exec();
  }

  async update(id: string, updateReactionDto: UpdateReactionDto) {
    return await this.reactionModel.findOneAndUpdate(
      { _id: id },
      { ...updateReactionDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.reactionModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
