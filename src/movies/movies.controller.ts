import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll() {
        return this.moviesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this,this.moviesService.create(movieData);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.moviesService.deleteOne(id);
    }

    @Patch(':id')
    patch(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
        this.moviesService.update(id, updateData);
    }
}
