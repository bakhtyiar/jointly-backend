import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PublicService } from '@src/public/public.service';
import { AuthService } from '@src/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private publicService: PublicService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.publicService.isPublic(context)) return true;
    if (this.authService.matchGlobalPermissions(context)) return true;
    throw new UnauthorizedException();
  }
}
