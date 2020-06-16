export interface UserModel {
    id: number;
    username: string;
    email: string;
    bio?: string;
    image?: string;
    created?: Date;
    updated?: Date;
}
