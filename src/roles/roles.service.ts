import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '@src/roles/schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const createdUser = await new this.roleModel(createRoleDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.roleModel.find().exec();
  }

  async findOne(id: string) {
    return await this.roleModel.findById(id).exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.roleModel.findOneAndUpdate(
      { _id: id },
      { ...updateRoleDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.roleModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
