import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll() {
        return this.moviesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData) {
        return this,this.moviesService.create(movieData);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.moviesService.deleteOne(id);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() updateData: any) {
        return {
            updatedMove : id,
            ...updateData
        };
    }
}
