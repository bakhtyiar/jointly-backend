import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user', user);
    try {
      return this.matchRoles(roles, user.username);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    console.log('reqR', requiredRoles);
    console.log('usrR', userRoles);
    //TODO: implement vlookuped roles and find between them
    // return requiredRoles.some((role) => userRoles.includes(role));
    return true;
  }
}
