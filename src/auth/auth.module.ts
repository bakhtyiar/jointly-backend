import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configKeys } from '@src/config/configuration';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(configKeys.JWT_KEY),
        signOptions: {
          expiresIn: configService.get(configKeys.JWT_EXPIRES_IN),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
