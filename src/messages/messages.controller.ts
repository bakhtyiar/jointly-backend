import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from '../utilities/validators/fileValidator';
import { fileNameGenerator } from '@src/utilities/generators/fileNameGenerator';

//todo: implement guard , apply guard to private routes
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
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
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

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
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
