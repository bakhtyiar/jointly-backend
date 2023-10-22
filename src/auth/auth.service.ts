import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePassword } from '@src/utilities/hashing/hashingPassword';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/user/user.service';
import { VerifyUserDto } from '@src/user/dto/verify-user.dto';
import { User } from '@src/user/schemas/user.schema';
import { Role } from '@src/roles/schemas/role.schema';
import { PermissionDocument } from '@src/permissions/schemas/permission.schema';

export type TRoleWithPermissions = Omit<Role, 'permissions'> & {
  permissions: PermissionDocument[];
};

export type TUserWithRolesAndPermissions = Omit<User, 'roles'> & {
  roles: TRoleWithPermissions[];
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authentication(verifyUserDto: VerifyUserDto): Promise<any> {
    const user = await this.userService.findOneForVerifying(verifyUserDto);
    if (!(await comparePassword(verifyUserDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.login, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  matchGlobalPermissions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const path = request.route.path;
    const method = request.method;
    return user?.roles.find((role) => {
      return (
        role.permissions.some((permission) => {
          return permission.method === method && permission.path === path;
        }) && role.isGlobal === true
      );
    });
  }
}
