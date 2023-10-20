import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AppService } from '@src/app.service';
import { extractRoutesMethods } from '@src/utilities/parsers/parseRoutesMethods';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from '@src/permissions/schemas/permission.schema';
import { BulkWriteResult } from 'mongodb';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const createdPermission = await new this.permissionModel(
      createPermissionDto,
    );
    return createdPermission.save();
  }

  async findAll() {
    return await this.permissionModel.find().exec();
  }

  async findOne(id: number) {
    return await this.permissionModel.findById(id).exec();
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionModel.findOneAndUpdate(
      { _id: id },
      { ...updatePermissionDto },
      { new: true },
    );
  }

  async regeneratePerms(): Promise<Partial<BulkWriteResult>> {
    const controllers = this.appService.getControllers();
    const routesAndMethods = extractRoutesMethods(controllers.stack);
    const operations = routesAndMethods.map((doc) => {
      return {
        updateOne: {
          filter: { path: doc.path, method: doc.method },
          update: {
            $set: { ...doc },
          },
          upsert: true, // Create new document if not found already existing
        },
      };
    });
    return await this.permissionModel.bulkWrite(operations);
  }

  async remove(id: number) {
    return await this.permissionModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
