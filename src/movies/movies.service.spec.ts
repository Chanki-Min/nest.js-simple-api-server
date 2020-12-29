import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import * as faker from 'faker';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('shuld return a Movie[]', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('shuld be a Movie instance', () => {
      const id = service.create({
        title: "test movie",
        year: 2020,
        genres: ["test genre"],
      });
      const result: Movie = service.getOne(id);
      expect(result).toBeInstanceOf(Movie);
    });

    it('should return a 404 error', () => {
      const invaildId: number = faker.random.number();

      try {
        service.getOne(invaildId);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with id not found. ID: ${invaildId}`)
      }
    })
  })

});
