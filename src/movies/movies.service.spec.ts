import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import * as faker from 'faker';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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

  describe('deleteOne()', () => {
    it('shuld delete a movie', () => {
      const id:number = service.create({
        title: "test movie",
        year: 2020,
        genres: ["test genre"],
      });

      const beforeDelete: Movie[] = service.getAll();
      service.deleteOne(id);
      const afterDelete: Movie[] = service.getAll();

      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
      try {
        service.getOne(id);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with id not found. ID: ${id}`);
      }
    });

    it('should throw exception on non-existing movie', () => {
      const id:number = faker.random.number();
      try {
        service.deleteOne(id);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with id not found. ID: ${id}`);
      }
    });
  });

  describe('create()', () => {
    it('should create a movie', () => {
      const movieDto:CreateMovieDto = {
        title: faker.lorem.sentence(),
        year: faker.date.recent().getFullYear(),
        genres: [faker.lorem.sentence()],
      };

      const id:number = service.create(movieDto);
      const createdMovie: Movie = service.getOne(id);
      const expectedMovie = {
        id: id,
        ...movieDto,
      };
      expect(createdMovie).toEqual(expectedMovie);
    });
  });

  describe('update()', () => {
    it('should update a movie', () => {
      const movieDto:CreateMovieDto = {
        title: faker.lorem.sentence(),
        year: faker.date.recent().getFullYear(),
        genres: [faker.lorem.sentence()],
      };
      const updateDto: UpdateMovieDto = {
        title: faker.lorem.sentence()
      }
      const id:number = service.create(movieDto);

      service.update(id, updateDto);

      const updatedMovie: Movie = service.getOne(id);
      const expectMovie:Movie = {
        id: id,
        ...movieDto,
        ...updateDto,
      };
      expect(updatedMovie).toEqual(expectMovie);
    });

    it('shuld throw 404 error on non-existing movie', () => {
      const id: number = faker.random.number();
      try {
        service.update(id, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

  });

});
