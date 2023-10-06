import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordUserDto } from '@src/user/dto/change-password-user.dto';
import { genSalt, hash } from 'bcrypt';
import { ChangeSecretUserDto } from '@src/user/dto/change-secret-user.dto';
import { ChangeAvatarUserDto } from '@src/user/dto/change-avatar-user.dto';
import { Model } from 'mongoose';
import { User } from '@src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from '@src/user/dto/login-user.dto';
import { comparePassword } from '@src/utilities/hashing/hashingPassword';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    createUserDto.password = await hash(createUserDto.password, salt);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const users = await this.userModel
      .find(
        {
          $or: [{ login: loginUserDto.login }, { email: loginUserDto.email }],
        },
        ['login', 'email', 'password'],
      )
      .exec();
    if (comparePassword(loginUserDto.password, users[0].password)) {
      // todo: implement jwt or cookie auth
      // const token = generateToken({ login: users[0].login });
      // return token;
    }
    return null;
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    console.log(users);
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  findOne(id: number) {
    // todo: implement
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // todo: implement
    return `This action updates a #${id} user`;
  }

  async changePassword(
    id: number,
    changePasswordUserDto: ChangePasswordUserDto,
  ) {
    // todo: implement
    const salt = await genSalt(10);
    const hashedPassword = await hash(changePasswordUserDto.password, salt);
    return `This action changes password a #${id} user`;
  }

  async changeSecret(id: number, changeSecretUserDto: ChangeSecretUserDto) {
    // todo: implement
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
    // todo: implement
    return `This action changes avatar a #${id} user`;
  }

  remove(id: number) {
    // todo: implement
    return `This action removes a #${id} user`;
  }
}
