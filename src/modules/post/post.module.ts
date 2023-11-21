import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { Post } from "./entities/post.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { PostController } from "./post.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})

export class PostModule {}
