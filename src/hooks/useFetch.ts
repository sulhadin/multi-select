import { useEffect, useState } from 'react';
import { Character } from '@/type';

type ReturnType = { characters: Character[] | null };

function useFetch(): ReturnType {
  const [characters, setCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(result => {
        setCharacters(result.results as Character[]);
      });
  }, []);

  return { characters };
}

export default useFetch;
