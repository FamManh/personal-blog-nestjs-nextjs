import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import {LoginUserDTO, RegisterUserDTO, FindOneParams} from './user.dto'
import { AuthGuard } from 'src/shared/auth.guard';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers() {
        try {
            return this.userService.showAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('api/users/:id')
    @UseGuards(new AuthGuard())
    readUser(@Param() params: FindOneParams) {
        try {
            return this.userService.read(params.id);
        } catch (error) {
            throw error;
        }
    }

    @Post('api/login')
    login(@Body() data: LoginUserDTO) {
        try {
            return this.userService.login(data);
        } catch (error) {
            throw error;
        }
    }

    @Post('api/register')
    register(@Body() data: RegisterUserDTO) {
        try {
            return this.userService.register(data);
        } catch (error) {
            throw error;
        }
    }
}
