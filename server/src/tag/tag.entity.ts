import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { TagRO } from './tag.dto';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    metaTitle: string;

    @Column('text')
    slug: string;


    toReponseObject(): TagRO {
        const { id, title, metaTitle, slug } = this;
        const responseObject: any = {
            id,
            title,
            metaTitle,
            slug,
        };

        return responseObject;
    }
}
