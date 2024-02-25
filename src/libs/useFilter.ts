import { useState } from 'react';
import debounce from 'lodash.debounce';

import { isArrayEmpty } from '@/libs/isArrayEmpty.ts';

type FilterType<T> = {
  /** The predicate function to filter items outside the hook. */
  predicate: (item: T, search: string) => unknown;
  /** The array of items to be filtered. */
  data: T[];
  /** The initial returned array of items before filtered. */
  initialData: T[];
  /** The debounce time (in milliseconds) for filtering as the user types. */
  wait?: number;
};

type ReturnType<T> = {
  searchText: string;
  onSearch: (value: string) => void;
  filteredData: T[] | undefined;
};

/**
 * Hook for filtering data based on a predicate function and search text.
 *
 * @template T - The type of items in the data array.
 *
 * @param {FilterType<T>} options - Options for the filter hook.
 *
 * @returns {ReturnType<T>} - An object containing the search text, search function, and the filtered data.
 */
const useFilter = <T>({
  predicate,
  data,
  initialData,
  wait = 500,
}: FilterType<T>): ReturnType<T> => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<T[] | undefined>(
    initialData,
  );

  const onSearch = (value: string) => {
    setSearchText(value);
    getFilteredData(value);
  };

  const getFilteredData = debounce((value: string) => {
    if (!data) {
      setFilteredData(undefined);
      return;
    }

    const result = data.filter(d => predicate(d, value));
    setFilteredData(isArrayEmpty(result) ? undefined : result);
  }, wait);

  return { searchText, onSearch, filteredData };
};

export default useFilter;
