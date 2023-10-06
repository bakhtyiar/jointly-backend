import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Injectable()
export class ReactionsService {
  create(createReactionDto: CreateReactionDto) {
    // todo: implement
    return 'This action adds a new reaction';
  }

  findAll() {
    // todo: implement
    return `This action returns all reactions`;
  }

  findOne(id: number) {
    // todo: implement
    return `This action returns a #${id} reaction`;
  }

  update(id: number, updateReactionDto: UpdateReactionDto) {
    // todo: implement
    return `This action updates a #${id} reaction`;
  }

  remove(id: number) {
    // todo: implement
    return `This action removes a #${id} reaction`;
  }
}
