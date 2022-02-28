import * as React from 'react';
import Image from 'next/image';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { getMovieData, Result, SearchResult, searchTitle, TmdbDetails } from 'lib/tmdb';
import '@reach/combobox/styles.css';
import { useDebounce } from 'hooks/useDebounce';
import { getMovieDetails, IMDBDetails as ImdbDetails } from 'lib/omdb';
import { collection, doc, setDoc, where, query, getDocs } from 'firebase/firestore';
import { db } from 'lib/firebase';

import { v4 as uuidv4 } from 'uuid';
import { formatDollar } from 'lib/formatDollar';
import { shimmer, toBase64 } from 'components/Shimmer';
import { BASE_IMG_URL_ORIGINAL } from 'constants/imageUrls';

export default function AddMovie() {
  const [term, setTerm] = React.useState('');
  const debouncedTerm = useDebounce(term, 500);

  const [options, setOptions] = React.useState<SearchResult>();
  const [searching, setIsSearching] = React.useState(false);

  const [movieFromList, setMovieFromList] = React.useState<Result>();
  const [tmdbData, setTmdbData] = React.useState<TmdbDetails>();
  const [imdbData, setImdbData] = React.useState<ImdbDetails>();

  const [showSubmitButton, setShowSubmitButton] = React.useState(false);

  // Search for titles
  React.useEffect(() => {
    if (!debouncedTerm) {
      setMovieFromList(undefined);
      setTmdbData(undefined);
      setImdbData(undefined);
    }
    async function init() {
      if (debouncedTerm) {
        setIsSearching(true);
        const titleOptions = await searchTitle(debouncedTerm);
        setOptions(titleOptions.data);
        setIsSearching(false);
      } else {
        setOptions(undefined);
        setIsSearching(false);
      }
    }
    init();
  }, [debouncedTerm]);

  // Get movie data after selection
  React.useEffect(() => {
    async function init() {
      const results = await getMovieData(movieFromList?.id);
      setTmdbData(results?.data);

      if (results && results.data.imdb_id) {
        const imdbResults = await getMovieDetails(results.data.imdb_id);
        setImdbData(imdbResults?.data);
      }

      if (movieFromList?.title) {
        const q = query(collection(db, 'movies'), where('title', '==', movieFromList?.title));
        const querySnapshot = await getDocs(q);

        const matches = [];

        querySnapshot.forEach(doc => {
          console.log(doc);
          if (doc.exists()) {
            matches.push(doc);
          }
        });

        if (matches.length === 0) {
          console.log('why ami here');
          setShowSubmitButton(true);
        }
      }
    }
    init();
  }, [movieFromList]);

  async function handleSubmit() {
    if (movieFromList && imdbData && tmdbData) {
      await setDoc(doc(db, 'movies', uuidv4()), {
        title: movieFromList.title,
        tagline: tmdbData.tagline,
        posterPath: movieFromList.poster_path,
        director: imdbData.Director.split(',').map(director => director.trim()),
        writer: imdbData.Writer.split(',').map(writer => writer.trim()),
        year: imdbData.Year,
        runtime: imdbData.Runtime,
        genre: imdbData.Genre.split(',').map(genre => genre.trim()),
        actors: imdbData.Actors.split(',').map(actor => actor.trim()),
        plot: imdbData.Plot,
        language: imdbData.Language.split(',').map(language => language.trim()),
        country: imdbData.Country.split(',').map(country => country.trim()),
        productionCompanies: tmdbData.production_companies,
        awards: imdbData.Awards,
        budget: tmdbData.budget,
        boxOffice: imdbData.BoxOffice,
        rated: imdbData.Rated,
        metascore: imdbData.Metascore,
        createdAt: Date.now(),
      });
    }

    setShowSubmitButton(false);
  }

  function handleSetMovie(option: Result) {
    setImdbData(undefined);
    setMovieFromList(option);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Combobox
        aria-labelledby='movie title search'
        className=' w-full relative flex justify-center md:w-1/2'
      >
        <ComboboxInput
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder='Movie Title... (e.g. Total Recall)'
          className='w-full px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          type='search'
          autoComplete='off'
          id='movie-title-search'
        />
        {searching && (
          <svg
            role='status'
            className='inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-yellow-400 absolute -right-12 top-1'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        )}

        <ComboboxPopover>
          <ComboboxList>
            {options?.results?.map(option => (
              <ComboboxOption
                className='font-normal'
                key={option.id}
                value={`${option.title} - ${option.release_date?.split('-')[0]}`}
                onClick={() => handleSetMovie(option)}
              />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <section>
        {imdbData && tmdbData && (
          <div className='flex flex-col md:flex-row'>
            <div className='flex flex-col'>
              <h2 className='mb-4 text-2xl font-bold text-gray-100 max-w-xs'>
                {movieFromList?.title}
              </h2>
              <Image
                alt={`Poster for${movieFromList?.title}`}
                src={`${BASE_IMG_URL_ORIGINAL}${movieFromList?.poster_path}`}
                width={330}
                height={500}
                layout='responsive'
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(330, 500))}`}
              />
              <h3 className='mx-auto text-center md:mt-3 sm:text-left sm:mx-0 text-xl text-gray-100 max-w-xs'>
                {tmdbData.tagline}
              </h3>
              {showSubmitButton ? (
                <button
                  disabled
                  onClick={handleSubmit}
                  className='px-4 py-2 mt-4 font-bold text-gray-100 transition bg-yellow-400 rounded hover:bg-yellow-600 hover:ease-out'
                >
                  Save to list
                </button>
              ) : (
                <button
                  disabled
                  className='px-4 py-2 mt-4 font-bold text-gray-100 bg-yellow-400 rounded cursor-not-allowed disabled:opacity-75'
                >
                  Added
                </button>
              )}
            </div>
            <div className='w-full md:w-1/2 pt-12 pl-4 md:ml-20'>
              <h4 className='text-lg font-bold text-gray-100'>
                Director: <span className='font-normal'>{imdbData.Director}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Writer: <span className='font-normal'>{imdbData.Writer}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Year: <span className='font-normal'>{imdbData.Year}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Runtime: <span className='font-normal'>{imdbData.Runtime}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Genre: <span className='font-normal'>{imdbData.Genre}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Staring: <span className='font-normal'>{imdbData.Actors}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Rated: <span className='font-normal'>{imdbData.Rated}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Summary: <span className='font-normal'>{imdbData.Plot}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Language: <span className='font-normal'>{imdbData.Language}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Country: <span className='font-normal'>{imdbData.Country}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Awards: <span className='font-normal'>{imdbData.Awards}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Box Office (Domestic): <span className='font-normal'>{imdbData.BoxOffice}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Budget: <span className='font-normal'>{formatDollar(tmdbData.budget)}</span>
              </h4>
              <h4 className='text-lg font-bold text-gray-100'>
                Metascore: <span className='font-normal'>{imdbData.Metascore}</span>
              </h4>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
