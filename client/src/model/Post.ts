import { UserModel } from "./User";
import { CategoryModel } from "./Category";

export interface PostModel {
    id?: number;
    title: string;
    slug: string;
    summary: string;
    published: number;
    metaTitle?: string;
    content?: string;
    publishedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    author?: UserModel;
    categories?: CategoryModel;
}