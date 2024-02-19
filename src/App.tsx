import '../index.css';
import MultiSelect from './components/multiSelect/MultiSelect.tsx';

function App() {
  return (
    <div className={'w-96 mx-auto'}>
      <MultiSelect suggestions={['ali', 'veli', 'deli', 'sulhadin', 'sümo']} />
    </div>
  );
}

export default App;
