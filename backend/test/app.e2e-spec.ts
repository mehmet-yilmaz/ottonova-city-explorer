import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Api } from 'src/api';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect(Api);
  });
});

describe('Cities API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cities (GET) should return an empty array initially', async () => {
    return request(app.getHttpServer()).get('/cities').expect(200).expect([]);
  });

  it('/cities (POST) should create a city', async () => {
    const city = { name: 'Berlin', country: 'Germany' };
    return request(app.getHttpServer())
      .post('/cities')
      .send(city)
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe('Berlin');
        expect(res.body.country).toBe('Germany');
      });
  });
});
