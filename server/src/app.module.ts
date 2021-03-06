import { Module } from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    MulterModule.register({
      dest: './uploads'
    }), 
    UserModule, 
    PostModule, 
    CategoryModule, 
    TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
