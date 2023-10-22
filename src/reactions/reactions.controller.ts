import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { AuthGuard } from '@src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNameGenerator } from '@src/utilities/generators/fileNameGenerator';
import { fileFilter } from '@src/utilities/validators/fileValidator';

//todo: implement handling files
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  // noinspection TypeScriptValidateTypes
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '@data/files',
        filename: fileNameGenerator,
      }),
      fileFilter: fileFilter,
    }),
  )
  @Post()
  create(
    @Body() createReactionDto: CreateReactionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  findAll() {
    return this.reactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionsService.findOne(id);
  }

  // noinspection TypeScriptValidateTypes
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '@data/files',
        filename: fileNameGenerator,
      }),
      fileFilter: fileFilter,
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReactionDto: UpdateReactionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.reactionsService.update(id, updateReactionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
