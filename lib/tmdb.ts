import axios from 'axios';

const TMDB_URL = 'https://api.themoviedb.org/3/';

const tmdb = axios.create({
  baseURL: TMDB_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_REACT_APP_MOVIE_API_KEY,
  },
});

export async function searchTitle(query: string) {
  const data = await tmdb.get('search/movie', {
    params: {
      query,
    },
  });
  console.log(data);
  return data;
}
