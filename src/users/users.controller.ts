import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CreateUserDto, FilteredUserDto, SignInUserDto } from './dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from 'interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { PostsService } from 'posts/posts.service';
import { Post as _Post } from 'posts/post.entity';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService, // private postsService: PostsService,
  ) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    const [accessToken] = await this.authService.signIn(signInUserDto);
    return accessToken;
  }

  @Get()
  @Serialize(UserDto)
  async getFilteredUsers(
    @Param() filteredUserDto: FilteredUserDto,
  ): Promise<User[]> {
    return this.usersService.getFilteredUsers(filteredUserDto);
  }

  @Get('/:id')
  @Serialize(UserDto)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  //test
  // @Get('/:id/posts')
  // async getPostsByUserId(@Param('id') id: string): Promise<_Post[]> {
  //   return this.postsService.getPostsByUserId(id);
  // }
}
