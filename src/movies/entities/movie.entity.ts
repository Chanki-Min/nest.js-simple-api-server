import { CreateMovieDto } from '../dto/create-movie.dto';
export class Movie {
    constructor(id: number, dto: CreateMovieDto) {
        this.id = id;
        this.title = dto.title;
        this.year = dto.year;
        this.genres = dto.genres;
    }

    id: number;
    title: string;
    year: number;
    genres: string[]; 
}