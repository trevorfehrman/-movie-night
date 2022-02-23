import * as React from 'react'; /* This example requires Tailwind CSS v2.0+ */
import { NextPage } from 'next';

import { Layout } from '../components/layout';
import { useMovies } from '../hooks/useMovies';

import axios from 'axios';

const TMDB_URL = 'https://api.themoviedb.org/3';
async function fetchMovies() {
  const data = await axios.get(`${TMDB_URL}/discover/movie`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_REACT_APP_MOVIE_API_KEY,
    },
  });
  console.log(data);
}

const Home: NextPage = () => {
  const movies = useMovies();

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <main className='flex justify-center'>
        {movies?.map(movie => (
          <div key={movie.id}>
            <div>{movie.title}</div>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Home;
