import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { CategoryEntity } from "src/category/category.entity";
import { PostRO } from "./post.dto";
import { type } from "os";
import { TagEntity } from "src/tag/tag.entity";

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    metaTitle: string;

    @Column('text')
    slug: string;

    @Column('text')
    summary: string;

    @Column('boolean')
    published: boolean;

    @Column('date')
    publishedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type=>UserEntity, author => author.id)
    author: UserEntity;

    @ManyToMany(type=>CategoryEntity, {cascade: true})
    @JoinTable()
    categories: CategoryEntity[];

    @ManyToMany(type=>TagEntity, {cascade: true})
    @JoinTable()
    tags: TagEntity[]

    toReponseObject(): PostRO {
        const {id, title, metaTitle, slug, summary, published, publishedAt, createdAt, updatedAt, author, categories, tags } = this;
        const responseObject: any = {
            id,
            title,
            metaTitle,
            slug,
            summary,
            published,
            publishedAt,
            createdAt,
            updatedAt,
            author: author.toResponseObject(),
            categories,
            tags
        };
        
        return responseObject;
    }
}
