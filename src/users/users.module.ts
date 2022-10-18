import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsService } from 'posts/posts.service';
import { PostsModule } from 'posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_KEY'),
          signOptions: { expiresIn: 3600 },
        };
      },
    }),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService, LocalStrategy],
  exports: [JwtStrategy, PassportModule, AuthService, UsersService],
})
export class UsersModule {}
