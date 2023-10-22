import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PublicService } from '@src/public/public.service';
import { AuthService } from '@src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private publicService: PublicService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.publicService.isPublic(context)) return true;
    const matchedPerms = this.authService.matchGlobalPermissions(context);
    if (matchedPerms) return true;
    throw new ForbiddenException();
  }
}
