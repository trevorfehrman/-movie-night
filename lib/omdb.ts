import axios from 'axios';

const OMDB_URL = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&`;

const omdb = axios.create({
  baseURL: OMDB_URL,
});

export interface IMDBDetails {
  Actors: string; //comma separated
  Awards: string;
  BoxOffice: string;
  Country: string; //comma separated
  DVD: string;
  Director: string;
  Genre: string; //comma separated
  Language: string; //comma separated
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Response: string;
  Runtime: string;
  Type: string;
  Website: string;
  Writer: string; //comma separated
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export async function getMovieDetails(id?: string) {
  if (id) {
    const data = omdb.get<IMDBDetails>('/', {
      params: {
        i: id,
      },
    });
    return data;
  }
}
