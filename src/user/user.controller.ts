import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNameGenerator } from '@src/utilities/generators/fileNameGenerator';
import { fileFilter } from '@src/utilities/validators/fileValidator';
import { VerifyUserDto } from '@src/user/dto/verify-user.dto';
import { AuthGuard } from '@src/auth/auth.guard';

// noinspection TypeScriptValidateTypes
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Post('login')
  // login(@Body() loginUserDto: LoginUserDto) {
  //   return this.userService.login(loginUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Roles(['admin', 'myLogin111'])
  // @UseGuards(AuthGuard, RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('verify')
  findOne(@Body() verifyUserDto: VerifyUserDto) {
    return this.userService.findOneForVerifying(verifyUserDto);
  }

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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
