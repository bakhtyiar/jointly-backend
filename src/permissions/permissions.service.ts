import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  create(createPermissionDto: CreatePermissionDto) {
    // todo: implement
    return 'This action adds a new permission';
  }

  findAll() {
    // todo: implement
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    // todo: implement
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    // todo: implement
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    // todo: implement
    return `This action removes a #${id} permission`;
  }
}
