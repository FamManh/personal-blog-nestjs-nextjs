import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data, ctx: ExecutionContext)=>{

    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
})