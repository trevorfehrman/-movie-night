import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { db } from 'lib/firebase';
import { ProductionCompany } from 'lib/tmdb';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  posterPath: string;
  director: string[];
  picker: string;
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

const moviesConverter: FirestoreDataConverter<Movie> = {
  toFirestore(movies: WithFieldValue<Movie>): DocumentData {
    return { ...movies };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Movie {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      tagline: data.tagline,
      posterPath: data.posterPath,
      director: data.director,
      picker: data.picker,
      writer: data.writer,
      year: data.year,
      runtime: data.runtime,
      genre: data.genre,
      actors: data.actors,
      plot: data.plot,
      language: data.language,
      country: data.country,
      productionCompanies: data.productionCompanies,
      awards: data.awards,
      budget: data.budget,
      boxOffice: data.boxOffice,
      rated: data.rated,
      metascore: data.metascore,
      createdAt: data.createdAt,
    };
  },
};

const moviesRef = collection(db, 'movies').withConverter(moviesConverter);
const moviesQuery = query(moviesRef, orderBy('createdAt', 'desc'));

export function useMovies() {
  const [movies, loading, error] = useCollectionData(moviesQuery);

  return { movies, loading, error };
}
