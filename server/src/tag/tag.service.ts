import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagEntity } from './tag.entity';
import { TagRO } from './tag.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private categoryEntity: Repository<TagEntity>
    ) {}

    async showAll(): Promise<TagRO[]> {
        const categories = await this.categoryEntity.find();
        return categories.map(category => category.toReponseObject());
    }

    async create(data: TagEntity): Promise<TagRO> {
        try {
            const category = await this.categoryEntity.create(data);
            await this.categoryEntity.save(category);
            return category.toReponseObject();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async read(id: number): Promise<TagRO> {
        const category = await this.categoryEntity.findOne({
            where: { id }
        });
        if (!category) {
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }
        return category.toReponseObject();
    }

    async update(
        id: number,
        data: Partial<TagEntity>,
    ): Promise<TagRO> {
        const category = await this.categoryEntity.findOne({
            where: { id }
        });

        if (!category) {
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }

        await this.categoryEntity.update({ id }, data);
        const newCategory = await this.categoryEntity.findOne({
            where: { id },
        });
        return newCategory.toReponseObject();
    }

    async destroy(id: number): Promise<TagRO> {
        const category = await this.categoryEntity.findOne({
            where: { id }
        });
        if (!category) {
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }
        await this.categoryEntity.delete({ id });
        return category.toReponseObject();
    }
}
