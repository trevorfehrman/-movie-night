import axios from 'axios';

const TMDB_URL = 'https://api.themoviedb.org/3/';

const tmdb = axios.create({
  baseURL: TMDB_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_REACT_APP_MOVIE_API_KEY,
  },
});

export interface Result {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface SearchResult {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

enum Status {
  Rumored = 'Rumored',
  Planned = 'Planned',
  InProduction = 'In Production',
  PostProduction = 'Post Production',
  Released = 'Released',
  Canceled = 'Canceled',
}

export interface TmdbDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string };
  releae_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string; name: string };
  status: Status;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export async function searchTitle(query: string) {
  const data = await tmdb.get<SearchResult>('search/movie', {
    params: {
      query,
    },
  });
  return data;
}

export async function getMovieData(id?: number) {
  if (id) {
    const data = await tmdb.get<TmdbDetails>(`movie/${id}`);
    return data;
  }
}
