import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostRO } from './post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    private ensureOwnership(post: PostEntity, userId: number) {
        if (post.author.id !== userId || !post.author) {
            throw new HttpException('Incorrect user', HttpStatus.FORBIDDEN);
        }
    }

    async showAll(): Promise<PostRO[]> {
        const posts = await this.postRepository.find({relations: ['author']});
        return posts.map(post => post.toReponseObject());
    }

    async create(userId: number, data: PostEntity): Promise<PostRO> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });

            const post = await this.postRepository.create({
                ...data,
                author: user,
            });
            await this.postRepository.save(post);
            return post.toReponseObject()
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async read(id: number): Promise<PostRO> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author'],
        });
        if (!post) {
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }
        return post.toReponseObject();
    }

    async update(
        id: number,
        userId: number,
        data: Partial<PostEntity>,
    ): Promise<PostRO> {
        try {
            const post = await this.postRepository.findOne({
                where: { id },
                relations: ['author'],
            });
            if (!post) {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
            // check ownership
            this.ensureOwnership(post, userId);
            await this.postRepository.update({ id }, data);
            const newPost = await this.postRepository.findOne({
                where: { id },
                relations: ['author'],
            });
            return newPost.toReponseObject();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number, userId: number): Promise<PostRO> {
        try {
            const post = await this.postRepository.findOne({
                where: { id },
                relations: ['author'],
            });
            if (!post) {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
            // checkownership
            this.ensureOwnership(post, userId);
            await this.postRepository.delete({ id});
            return post.toReponseObject();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
