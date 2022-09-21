import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, FilteredUserDto } from './dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, age, name } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepo.create({
      name,
      age,
      password: hashedPassword,
      email,
    });

    try {
      await this.usersRepo.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('This email is used');
      else {
        // throw new InternalErrorException(); // giai quyet sau
      }
    }
    return user;
  }
  async getFilteredUsers(filteredUserDto: FilteredUserDto): Promise<User[]> {
    if (Object.keys(filteredUserDto).length === 0) {
      return this.usersRepo.find({
        where: {},
      });
    }

    const query = this.usersRepo.createQueryBuilder('user');
    const { name } = filteredUserDto;
    const users = await query
      .andWhere('user.name LIKE :name', {
        name: `%${name}%`,
      })
      .getMany();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async getUserById(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersRepo.findOne({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    return user;
  }

  async getUserbyEmail(email: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersRepo.findOne({ where: { email } });
    } catch (err) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    return user;
  }
}
