import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '@src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VerifyUserDto } from '@src/user/dto/verify-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    createUserDto.password = await hash(createUserDto.password, salt);
    const createdUser = await new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id, '-password').exec();
  }

  async findOneForVerifying(verifyUserDto: VerifyUserDto) {
    return await this.userModel
      .findOne(
        {
          $or: [
            { _id: verifyUserDto.id },
            { login: verifyUserDto.login },
            { email: verifyUserDto.email },
          ],
        },
        ['_id', 'login', 'email', 'password', 'roles'],
      )
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
