import { useCollectionData } from './useCollectionData';

interface Movie {
  title: string;
  picker: string;
  id: string;
}

export function useMovies() {
  return useCollectionData<Movie>('movies');
}
