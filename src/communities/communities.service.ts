import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  create(createCommunityDto: CreateCommunityDto) {
    // todo: implement
    return 'This action adds a new community';
  }

  findAll() {
    // todo: implement
    return `This action returns all communities`;
  }

  findOne(id: number) {
    // todo: implement
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    // todo: implement
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    // todo: implement
    return `This action removes a #${id} community`;
  }
}
