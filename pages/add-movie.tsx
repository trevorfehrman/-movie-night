import * as React from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';
import { SearchResult, searchTitle } from 'lib/tmdb';
import '@reach/combobox/styles.css';
import { useThrottle } from 'react-use';
import { useDebounce } from 'hooks/useDebounce';

// function useCityMatch(term: string) {
//   const throttledTerm = useThrottle(term, 100);
//   return React.useMemo(
//     () =>
//       term.trim() === ''
//         ? null
//         : matchSorter(cities, term, {
//             keys: [item => `${item.city}, ${item.state}`],
//           }),
//     [throttledTerm]
//   );
// }

export default function AddMovie() {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [options, setOptions] = React.useState<SearchResult>();
  const [searching, setIsSearching] = React.useState(false);

  React.useEffect(
    () => {
      async function init() {
        if (debouncedQuery) {
          setIsSearching(true);
          const results = await searchTitle(debouncedQuery);
          setOptions(results);
        } else {
          setOptions(undefined);
          setIsSearching(false);
        }
      }
      init();
    },
    [debouncedQuery] // Only call effect if debounced search term changes
  );

  async function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    const results = await searchTitle(e.currentTarget.value);
    setOptions(results);
  }

  return (
    <div>
      <Combobox aria-labelledby='demo'>
        <ComboboxInput onChange={e => setQuery(e.target.value)} />
        {searching && <div>loading...</div>}
        <ComboboxPopover>
          <ComboboxList>
            {options?.data.results.map(option => (
              <ComboboxOption key={option.id} value={option.title} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
