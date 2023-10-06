import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    // todo: implement
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  findAll() {
    // todo: implement
    return this.communitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // todo: implement
    return this.communitiesService.findOne(+id);
  }
  // todo: guard. only admins and owners can do this:
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    // todo: implement
    return this.communitiesService.update(+id, updateCommunityDto);
  }
  // todo: guard. only admins and owners can do this:
  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo: implement
    return this.communitiesService.remove(+id);
  }
}
