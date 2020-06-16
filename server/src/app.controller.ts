import { Controller, Get, Post, UseInterceptors, Res, Param, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('upload'))
    uploadFile(@UploadedFiles() files) {
        if (files && files[0]?.filename) {
            return {
                url: `http://localhost:5000/api/file/${files[0].filename}`,
            };
        } else {
            return {
                error: 'Error',
            };
        }
    }

    @Get('file/:imgPath')
    seeUploadedFile(@Param('imgPath') image, @Res() res) {
        return res.sendFile(image, { root: 'uploads' });
    }
}
