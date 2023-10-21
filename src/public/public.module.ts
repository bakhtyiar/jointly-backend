import { Global, Module } from '@nestjs/common';
import { PublicService } from '@src/public/public.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PublicService],
  exports: [PublicService],
})
export class PublicModule {}
