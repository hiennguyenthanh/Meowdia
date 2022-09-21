import {
  CanActivate,
  Dependencies,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private service: any, private reflector: Reflector) {}

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
    //
    return false;
  }
}
