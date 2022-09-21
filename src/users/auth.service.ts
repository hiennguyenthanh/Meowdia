import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  async signIn(
    signInUserDto: SignInUserDto,
  ): Promise<[{ accessToken: string }, User]> {
    const { email, password } = signInUserDto;
    const user = await this.usersService.getUserbyEmail(email);

    if (!user) {
      throw new UnauthorizedException(`User with email ${email} is not found`);
    }

    if ((await bcrypt.compare(password, user.password)) === false) {
      throw new UnauthorizedException('Password is incorrect');
    }

    //return token
    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return [{ accessToken }, user];
  }
}
