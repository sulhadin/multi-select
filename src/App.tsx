import '../index.css';
import MultiSelect from '@/multiSelect/MultiSelect.tsx';
import useFetch from '@/hooks/useFetch.ts';

function App() {
  const { characters } = useFetch();

  if (!characters) {
    return <div className={'w-96 mx-auto'}>Loading..</div>;
  }

  return (
    <div className={'w-96 mx-auto mt-5'}>
      <h1 className={'mb-2 text-sm font-semibold'}>Search Rick&Morty:</h1>
      <MultiSelect
        placeholder={'Search for some surprise'}
        filterField={'name'}
        options={characters}
        render={option => (
          <MultiSelect.Option
            image={option.image}
            title={option.name}
            description={`${option.episode.length} Episodes`}
          />
        )}
      />
    </div>
  );
}

export default App;
