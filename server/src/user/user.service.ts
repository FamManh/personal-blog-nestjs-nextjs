import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import {LoginUserDTO, RegisterUserDTO, UserRO} from './user.dto'


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async showAll(): Promise<UserRO[]>{
        let users = await this.userRepository.find();
        return users.map(user=>user.toResponseObject());
    }

    async read(id: number): Promise<UserRO>{
        let user = await this.userRepository.findOne({where: {id}});
        if(!user){
            throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        }
        return user.toResponseObject();
    }

    async login(data: LoginUserDTO): Promise<UserRO>{
        const { email, password } = data;
        let user = await this.userRepository.findOne({where: {email}});
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject(true);
    }

    async register(data: RegisterUserDTO): Promise<UserRO> {
        const {email} = data;
        let user = await this.userRepository.findOne({where: {email}});
        if(user){
            throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
        }

        user = await this.userRepository.create(data);  
        await this.userRepository.save(user);
        return user.toResponseObject(true);
    }
}
