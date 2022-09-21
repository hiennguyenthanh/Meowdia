import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from 'guards/roles.guard';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'postgres',
      password: '12345',
      database: 'Meowdia',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
  controllers: [],
  //
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useFactory: (ref) => new RolesGuard(ref),
    //   inject: [Reflector],
    // },
  ],
  //
})
export class AppModule {}
