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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://alex:alex123Pass@cluster0.b9wb9.mongodb.net/?retryWrites=true&w=majority',
    ),
    CommunitiesModule,
    UserModule,
    PermissionsModule,
    MessagesModule,
    ReactionsModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
