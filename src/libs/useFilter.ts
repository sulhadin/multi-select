import { useState } from 'react';
import { isArrayEmpty } from '@/libs/isArrayEmpty.ts';

type FilterType<T> = {
  /** The predicate function to filter items outside of the hook. */
  predicate: (item: T, search: string) => unknown;
  /** The array of items to be filtered. */
  data: T[];
  /** The initial returned array of items before filtered. */
  initialData: T[];
};

/**
 * Hook for filtering data based on a predicate function and search text.
 *
 * @template T - The type of items in the data array.
 *
 * @param {FilterType<T>} options - Options for the filter hook.
 *
 * @returns {{
 *   searchText: string,
 *   onSearch: (value: string) => void,
 *   filteredData: T[] | undefined
 * }} - An object containing the search text, search function, and the filtered data.
 */
const useFilter = <T>({ predicate, data, initialData }: FilterType<T>) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<T[] | undefined>(
    initialData,
  );

  const onSearch = (value: string) => {
    setSearchText(value);
    getFilteredData(value);
  };

  const getFilteredData = (value: string) => {
    if (!data) {
      setFilteredData(undefined);
      return;
    }

    const result = data.filter(d => predicate(d, value));
    setFilteredData(isArrayEmpty(result) ? undefined : result);
  };

  return { searchText, onSearch, filteredData };
};

export default useFilter;
