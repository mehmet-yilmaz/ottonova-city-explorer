import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Api } from './api';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "API"', () => {
      expect(appController.getHello()).toBe(Api);
    });
  });
});
