import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto, FilteredUserDto, SignInUserDto } from './dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    // console.log(req.user);
    const [accessToken] = await this.authService.signIn(signInUserDto);
    return accessToken;
  }

  @Get()
  async getFilteredUsers(
    @Param() filteredUserDto: FilteredUserDto,
  ): Promise<User[]> {
    return this.usersService.getFilteredUsers(filteredUserDto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
}
