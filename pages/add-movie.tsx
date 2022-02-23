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
  const [options, setOptions] = React.useState<SearchResult>();

  async function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    const results = await searchTitle(e.currentTarget.value);
    setOptions(results);
  }

  return (
    <div>
      <Combobox aria-labelledby='demo'>
        <ComboboxInput onChange={handleSearch} />
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
