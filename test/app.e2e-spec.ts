import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as faker from 'faker';
import { UpdateMovieDto } from '../src/movies/dto/update-movie.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 200', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: faker.lorem.sentence(),
          year: faker.date.recent().getFullYear(),
          genres: [faker.lorem.sentence()],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: faker.lorem.sentence(),
          year: faker.date.recent().getFullYear(),
          genres: [faker.lorem.sentence()],
          badParam : 'hi'
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });

    it('GET 404', () => {
      const id: number = faker.random.number();
      return request(app.getHttpServer())
        .get(`/movies/${id}`)
        .expect(404);
    })

    it('PATCH', () => {
      const id: number = 1;
      const updateDto: UpdateMovieDto = {
        title: faker.lorem.sentence()
      }
      return request(app.getHttpServer()).
        patch(`/movies/${id}`)
        .send(updateDto)
        .expect(200);
    })

    it('DELETE', () => {
      const id: number = 1;
      return request(app.getHttpServer())
        .delete(`/movies/${id}`)
        .expect(200);
    })
  });
});
