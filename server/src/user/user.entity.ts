import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { UserRO } from "./user.dto";



@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = false) : UserRO{
        const {id, created, updated, username, email, bio, image } = this;
        const responseObject: any = {
            id,
            created,
            updated,
            username,
            email,
            bio,
            image,
        };
        if(showToken){
            responseObject.token = this.token;
        }
        return responseObject;
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password)
    }

    private get token(){
        const {id} = this;
        return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '30d'})
    }
}