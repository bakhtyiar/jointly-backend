import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  // todo: guard. only moders, admins, owners can do this:
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    // todo: implement
    return this.chatsService.create(createChatDto);
  }

  @Get()
  findAll() {
    // todo: implement
    return this.chatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // todo: implement
    return this.chatsService.findOne(+id);
  }
  // todo: guard. only moders, admins, owners can do this:
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    // todo: implement
    return this.chatsService.update(+id, updateChatDto);
  }
  // todo: guard. only moders, admins, owners can do this:
  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo: implement
    return this.chatsService.remove(+id);
  }
}
