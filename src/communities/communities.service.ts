import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Community } from '@src/communities/schemas/community.schema';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectModel(Community.name) private communityModel: Model<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto) {
    const createdUser = await new this.communityModel(createCommunityDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.communityModel.find().exec();
  }

  async findOne(id: string) {
    return await this.communityModel.findById(id).exec();
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    return await this.communityModel.findOneAndUpdate(
      { _id: id },
      { ...updateCommunityDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.communityModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
