import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from '../utilities/validators/fileValidator';
import { fileNameGenerator } from '@src/utilities/generators/fileNameGenerator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  // todo: implement fix validation types
  // noinspection TypeScriptValidateTypes
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: 'data/files',
        filename: fileNameGenerator,
      }),
      fileFilter: fileFilter,
    }),
  )
  create(
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // todo: implement
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    // todo: implement
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // todo: implement
    return this.messagesService.findOne(+id);
  }

  // todo: guard. only author can do this:
  // noinspection TypeScriptValidateTypes
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: '@data/files',
        filename: fileNameGenerator,
      }),
      fileFilter: fileFilter,
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // todo: implement
    return this.messagesService.update(+id, updateMessageDto);
  }

  // todo: guard. only author, moder, admin, superadmin can do this:
  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo: implement
    return this.messagesService.remove(+id);
  }
}
