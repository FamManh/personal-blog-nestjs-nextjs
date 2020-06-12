import { Controller, Get, Post, UseGuards, Body, Param, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { TagEntity } from './tag.entity';
import { FindOneParams } from './tag.dto';

@Controller('api/tags')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get()
    showAllTag() {
        return this.tagService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    createTag(@Body() data: TagEntity) {
        try {
            return this.tagService.create(data);
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    readTag(@Param() params: FindOneParams) {
        try {
            return this.tagService.read(params.id);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updateTag(
        @Param() params: FindOneParams,
        @Body() data: TagEntity,
    ) {
        try {
            return this.tagService.update(params.id, data);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyTag(@Param() params: FindOneParams) {
        try {
            return this.tagService.destroy(params.id);
        } catch (error) {
            throw error;
        }
    }
}
