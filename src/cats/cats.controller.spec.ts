import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('Cats Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService]
    }).compile();
  });
  it('should be defined', () => {
    const controller: CatsController = module.get<CatsController>(CatsController);
    expect(controller).toBeDefined();
  });
});
