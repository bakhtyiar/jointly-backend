import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  // todo: guard for permitted people some unsafe actions, @get for everybody
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    // todo: implement
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    // todo: implement
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // todo: implement
    return this.permissionsService.findOne(+id);
  }

  @Patch('/regenerate')
  regeneratePerms() {
    return this.permissionsService.regeneratePerms();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    // todo: implement
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo: implement
    return this.permissionsService.remove(+id);
  }
}
