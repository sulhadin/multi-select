import '../index.css';
import MultiSelect from './components/multiSelect/MultiSelect.tsx';

function App() {
  return (
    <div className={'w-96 mx-auto'}>
      <MultiSelect
        options={[
          { id: '1', name: 'Option 1' },
          { id: '2', name: 'Option 2' },
          { id: '3', name: 'Option 3' },
          { id: '4', name: 'Option 4' },
        ]}
      />
    </div>
  );
}

export default App;
