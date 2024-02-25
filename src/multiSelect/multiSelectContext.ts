import { createContext, useContext } from 'react';

export const SearchContext = createContext<string | null>(null);

export const useGetSearchedText = () => useContext(SearchContext);
