import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, userInfo: any) {
    if (err) {
      throw err;
    }

    if (!userInfo) {
      throw new UnauthorizedException();
    }

    return userInfo;
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
