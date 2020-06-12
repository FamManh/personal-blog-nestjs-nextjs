import { IsNumberString } from 'class-validator';

export class TagRO {
    id: number;
    title: string;
    metaTitle: string;
    slug: string;
}

export class FindOneParams {
    @IsNumberString()
    id: number;
}
