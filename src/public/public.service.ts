import { ExecutionContext, Injectable } from '@nestjs/common';
import { configKeys } from '@src/config/configuration';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PublicService {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride(
      this.configService.get(configKeys.IS_PUBLIC_KEY),
      [context.getHandler(), context.getClass()],
    );
  }
}
