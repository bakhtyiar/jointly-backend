import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from '@src/utilities/hashing/hashingPassword';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/user/user.service';
import { VerifyUserDto } from '@src/user/dto/verify-user.dto';

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
}
