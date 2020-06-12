import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CategoryRO } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryEntity: Repository<CategoryEntity>,
        @InjectRepository(UserEntity) private userEntiry: Repository<UserEntity>
    ){}

    async showAll(): Promise<CategoryRO[]>{
        const categories = await this.categoryEntity.find();
        return categories.map(category => category.toReponseObject());
    }

    async create(data: CategoryEntity): Promise<CategoryRO>{
        try{
            const category =  await this.categoryEntity.create(data);
            await this.categoryEntity.save(category);
            return category.toReponseObject();
        }catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async read(id: number): Promise<CategoryRO>{
        const category = await this.categoryEntity.findOne({
            where: {id}
        });
        if(!category){
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }
        return category.toReponseObject();
    }

    async update(id: number, data: Partial<CategoryEntity>): Promise<CategoryRO>{
        const category = await this.categoryEntity.findOne({
            where: {id}
        });

        if(!category){
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND)
        }

        await this.categoryEntity.update({id}, data);
        const newCategory = await this.categoryEntity.findOne({
            where: {id}
        })
        return newCategory.toReponseObject();
    }

    async destroy(id: number): Promise<CategoryRO>{
        const category = await this.categoryEntity.findOne({
            where: {id}
        });
        if(!category){
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }
        await this.categoryEntity.delete({id});
        return category.toReponseObject();
    }

}
