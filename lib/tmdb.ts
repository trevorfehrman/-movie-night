import axios from 'axios';

const TMDB_URL = 'https://api.themoviedb.org/3/';

const tmdb = axios.create({
  baseURL: TMDB_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_REACT_APP_MOVIE_API_KEY,
  },
});

interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface SearchResult {
  data: {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  };
}

export async function searchTitle(query: string) {
  const data: SearchResult = await tmdb.get('search/movie', {
    params: {
      query,
    },
  });
  console.log(data);
  return data;
}
