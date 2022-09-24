import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as _Post } from './post.entity';
import { Serialize } from 'interceptors/serialize.interceptor';
import { PostDto, FilteredPostDto, UpdatePostDto } from './dto';
import { GetUser } from 'users/get-user.decorator';
import { User } from 'users/user.entity';
import { Roles } from 'decorators/created-by.decorator';
import { RolesGuard } from 'guards/roles.guard';
import { Role } from 'enum/role.enum';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard) // authentication
@Serialize(PostDto)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(
    @Body() createPost: CreatePostDto,
    @GetUser() currentUser: User,
  ): Promise<_Post> {
    return this.postsService.createPost(createPost, currentUser);
  }

  @Get()
  getFilteredPosts(
    @Query() filteredPostDto: FilteredPostDto,
  ): Promise<_Post[]> {
    return this.postsService.getFilteredPosts(filteredPostDto);
  }

  @Get('/:id')
  getPost(@Param('id') id: string): Promise<_Post> {
    return this.postsService.getPostById(id);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard<PostsService>) // authorization
  @Roles(Role.Owner)
  async updateContent(
    @Param('id') id: string,
    @Body() updateContentDto: UpdatePostDto,
    @GetUser() currentUser: User,
  ): Promise<_Post> {
    const post = await this.postsService.getPostById(id);
    // console.log(req.user);
    // console.log('user id: ', currentUser.id);
    // console.log('post user id: ', post);

    if (currentUser.id !== post.user.id) {
      throw new UnauthorizedException(`Must be post's owner to edit`);
    }
    return this.postsService.updatePost(id, updateContentDto);
  }
}
