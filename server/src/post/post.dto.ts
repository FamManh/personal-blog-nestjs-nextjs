import { UserEntity } from 'src/user/user.entity';
import { IsNumberString } from 'class-validator';
import { CategoryRO } from 'src/category/category.dto';
import { UserRO } from 'src/user/user.dto';

export class PostRO {
    id: number;
    title: string;
    metaTitle: string;
    slug: string;
    content: string;
    summary: string;
    published: boolean;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    author: UserRO;
    categories?: CategoryRO;
}

export class FindOneParams {
    @IsNumberString()
    id: number;
}
