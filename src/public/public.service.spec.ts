import { Test, TestingModule } from '@nestjs/testing';
import { PublicService } from './public.service';

describe('PublicService', () => {
  let service: TResult;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicService],
    }).compile();

    service = module.get(PublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
