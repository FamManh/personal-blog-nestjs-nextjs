import { Controller, Get, Post, Put, Delete, UseGuards, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { CategoryEntity } from './category.entity';
import { FindOneParams } from './category.dto';

@Controller('api/categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    showAllCategory() {
        return this.categoryService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    createCategory(@Body() data: CategoryEntity) {
        try {
            return this.categoryService.create(data);
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    readCategory(@Param() params: FindOneParams) {
        try {
            return this.categoryService.read(params.id);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updateCategory(
        @Param() params: FindOneParams,
        @Body() data: CategoryEntity,
    ) {
        try {
            return this.categoryService.update(params.id, data);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyCategory(@Param() params: FindOneParams) {
        try {
            return this.categoryService.destroy(params.id);
        } catch (error) {
            throw error;
        }
    }
}
