import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesGuard } from 'guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
  ],
  controllers: [],

  providers: [RolesGuard],
})
export class AppModule {}
