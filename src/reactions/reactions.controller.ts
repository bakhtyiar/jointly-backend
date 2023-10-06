import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}
  // todo: guard for admins, @get for everybody

  @Post()
  create(@Body() createReactionDto: CreateReactionDto) {
    // todo: implement
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  findAll() {
    // todo: implement
    return this.reactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // todo: implement
    return this.reactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    // todo: implement
    return this.reactionsService.update(+id, updateReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo: implement
    return this.reactionsService.remove(+id);
  }
}
