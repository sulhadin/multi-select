import '../index.css';
import MultiSelect from '@/multiSelect/MultiSelect.tsx';
import useFetch from '@/hooks/useFetch.ts';

function App() {
  const { characters } = useFetch();

  if (!characters) {
    return <div className={'w-96 mx-auto'}>Loading..</div>;
  }

  return (
    <div className={'w-96 mx-auto'}>
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
