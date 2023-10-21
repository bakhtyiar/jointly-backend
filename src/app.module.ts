import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { UserModule } from './user/user.module';
import { PermissionsModule } from './permissions/permissions.module';
import { MessagesModule } from './messages/messages.module';
import { ReactionsModule } from './reactions/reactions.module';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import configuration, { configKeys } from '@src/config/configuration';
import { RolesModule } from './roles/roles.module';
import { PublicService } from './public/public.service';
import { PublicModule } from './public/public.module';

// todo: implement authentication
// todo: implement guards for some routes and actions
// todo: implement auth policy for sensitive and not sensitive actions

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'data', 'files'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(configKeys.DB_URI),
      }),
      inject: [ConfigService],
    }),
    CommunitiesModule,
    UserModule,
    PermissionsModule,
    MessagesModule,
    ReactionsModule,
    ChatsModule,
    AuthModule,
    RolesModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService, PublicService],
  exports: [AppService],
})
export class AppModule {}
