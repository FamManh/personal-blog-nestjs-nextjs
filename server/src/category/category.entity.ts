import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { CategoryRO } from "./category.dto";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    metaTitle: string;

    @Column('text')
    slug: string;

    @Column('text')
    content: string;

    toReponseObject(): CategoryRO {
        const {
            id,
            title,
            metaTitle,
            slug,
            content
        } = this;
        const responseObject: any = {
            id,
            title,
            metaTitle,
            slug,
            content
        };

        return responseObject;
    }
}
