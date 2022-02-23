import * as React from 'react'; /* This example requires Tailwind CSS v2.0+ */
import { NextPage } from 'next';

import { useMovies } from 'hooks/useMovies';

const Home: NextPage = () => {
  const movies = useMovies();

  return (
    <div className='flex justify-center'>
      {movies?.map(movie => (
        <div key={movie.id}>
          <div>{movie.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
