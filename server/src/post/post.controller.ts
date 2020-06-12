import { Controller, Get, Post, Put, Delete, UseGuards, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { PostEntity } from './post.entity';
import { FindOneParams } from './post.dto';


@Controller('api/posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    showAllPost() {
        return this.postService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    createPost(@User('id') userId: number, @Body() data: PostEntity) {
        try {
            return this.postService.create(userId, data);
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    readPost(@Param() params: FindOneParams) {
        try {
            return this.postService.read(params.id);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updatePost(
        @Param() params: FindOneParams,
        @User('id') user: number,
        @Body() data: PostEntity,
    ) {
        try {
            return this.postService.update(params.id, user, data);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyPost(@Param() params: FindOneParams, @User('id') user: number) {
        try {
            return this.postService.destroy(params.id, user);
        } catch (error) {
            throw error;
        }
    }
}
