import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PostsService } from 'posts/posts.service';
import { Role } from '../enum/role.enum';

interface IService {
  findCreated: (id: string) => Promise<string>;
}
@Injectable()
export class RolesGuard<T extends IService> implements CanActivate {
  // constructor(@Inject<T>() private service: T, private reflector: Reflector) {}
  constructor(private service: PostsService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const { id } = request.params;

    console.log('request user', user);
    const role = this.reflector.get<string>('roles', context.getHandler());

    if (user) {
      console.log('User:', user);
      if (role === Role.Owner) {
        const userId = await this.service.findCreated(id);
        return userId === user.id;
      }
    }
    return false;
  }
}

//---------------------@Dependencies + @Inject--------------------------------
// @Injectable()
// @Dependencies(Reflector)
// export class RolesGuard implements CanActivate {
//   constructor(
//     @Inject(PostsService) private service: PostsService,
//     @Inject(Reflector) private reflector: Reflector,
//   ) {}
