import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  it('should be defined', () => {
    const controller: AppController = app.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
