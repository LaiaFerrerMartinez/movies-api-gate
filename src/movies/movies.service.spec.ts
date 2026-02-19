import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  const findMock = jest.fn().mockResolvedValue([{ id: 1, title: 'Coco' }]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: findMock,
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listMovies should return an array of movies', async () => {
    const result = await service.listMovies();
    expect(result).toEqual([{ id: 1, title: 'Coco' }]);
    expect(findMock).toHaveBeenCalledWith({ order: { id: 'ASC' } });
  });

  it('should instantiate DTOs', () => {
    const createDto = new CreateMovieDto();
    createDto.id = 1;
    createDto.title = 'Coco';
    expect(createDto.title).toBe('Coco');

    const movieDto = new MovieDto();
    movieDto.id = 1;
    movieDto.title = 'Coco';
    expect(movieDto.id).toBe(1);

    const updateDto = new UpdateMovieDto();
    expect(updateDto).toBeDefined();
  });
});
