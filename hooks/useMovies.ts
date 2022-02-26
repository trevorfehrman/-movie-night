import { ProductionCompany } from 'lib/tmdb';
import { useCollectionData } from './useCollectionData';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  posterPath: string;
  director: string[];
  writer: string[];
  year: string;
  runtime: string;
  genre: string[];
  actors: string[];
  plot: string;
  language: string[];
  country: string[];
  productionCompanies: ProductionCompany[];
  awards: string;
  budget: number;
  boxOffice: string;
  rated: string;
  metascore: string;
  createdAt: string;
}

export function useMovies() {
  return useCollectionData<Movie>('movies');
}
