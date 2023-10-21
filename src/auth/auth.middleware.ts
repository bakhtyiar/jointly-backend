import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { configKeys } from '@src/config/configuration';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@src/user/schemas/user.schema';
import { Roles } from '@src/roles/roles.decorator';
import { Permission } from '@src/permissions/schemas/permission.schema';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async use(request: any, response: any, next: () => void) {
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        next();
      }
      const jwtData = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(configKeys.JWT_KEY),
      });
      if (request.user) {
        Object.assign(request.user, jwtData);
      } else {
        request.user = jwtData;
      }
    } catch {
      throw new UnauthorizedException('Error at verifying token');
    }
    try {
      const user = await this.userModel
        .aggregate([
          {
            $match: {
              _id: request.user._id,
            },
          },
          {
            $lookup: {
              from: Roles.name,
              localField: 'roles',
              foreignField: '_id',
              as: 'roles',
            },
          },
          {
            $lookup: {
              from: Permission.name,
              localField: 'roles.permissions',
              foreignField: '_id',
              as: 'permissions',
            },
          },
        ])
        .exec();
      Object.assign(request.user, user[0]);
    } catch {
      throw new NotFoundException(
        "Cannot aggregate user's roles and permissions",
      );
    }
    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
