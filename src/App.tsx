import '../index.css';
import MultiSelect from './components/multiSelect/MultiSelect.tsx';
import { useEffect, useState } from 'react';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(result => {
        setCharacters(result.results as Character[]);
      });
  }, []);

  if (!characters) {
    return <>loading"</>;
  }

  return (
    <div className={'w-96 mx-auto'}>
      <MultiSelect
        placeholder={'Search for some surprise'}
        filterField={'name'}
        options={characters}
        render={option => {
          return (
            <div className={'flex items-center gap-3'}>
              <img src={option.image} className={'w-12 h-12 rounded'} />
              <div className={'flex flex-col'}>
                <h1>{option.name}</h1>
                <h6
                  style={{ fontSize: '14px' }}
                >{`${option.episode.length} Episodes`}</h6>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default App;
