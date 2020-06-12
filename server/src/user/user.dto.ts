import { IsNotEmpty, IsEmail, Length, IsNumberString } from 'class-validator'

export interface UserRO {
    id: number;
    username: string;
    email: string;
    token: string;
    bio: string;
    image?: string;
    created: Date;
    updated: Date;
}


export class UserDTO{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class FindOneParams{
    @IsNumberString()
    id: number;
}

export class LoginUserDTO {
    @IsEmail()
    email: string;

    @Length(6, 32)
    password: string;
}

export class RegisterUserDTO {
    @IsNotEmpty()
    @Length(4, 20)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 32)
    password: string;
}
