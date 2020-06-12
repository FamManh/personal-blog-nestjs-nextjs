
import { IsNumberString } from "class-validator";
import { UserRO } from "src/user/user.dto";

export class CategoryRO {
    id: number;
    title: string;
    metaTitle: string;
    slug: string;
    content: string;
}

export class FindOneParams{
    @IsNumberString()
    id: number;
}
