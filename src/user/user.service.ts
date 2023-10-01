import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordUserDto } from '@src/user/dto/change-password-user.dto';
import { genSalt, hash } from 'bcrypt';
import { ChangeSecretUserDto } from '@src/user/dto/change-secret-user.dto';
import { ChangeAvatarUserDto } from '@src/user/dto/change-avatar-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async changePassword(
    id: number,
    changePasswordUserDto: ChangePasswordUserDto,
  ) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(changePasswordUserDto.password, salt);
    return `This action changes password a #${id} user`;
  }

  async changeSecret(id: number, changeSecretUserDto: ChangeSecretUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(changeSecretUserDto.password, salt);
    const hashedSecret = await hash(changeSecretUserDto.secretAnswer, salt);
    return `This action changes secret a #${id} user`;
  }

  async changeAvatar(
    id: number,
    changeAvatarUserDto: ChangeAvatarUserDto,
    file: Express.Multer.File,
  ) {
    return `This action changes avatar a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
