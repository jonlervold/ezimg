import './App.css';
import FileDisplay from './components/FileDisplay';
import Uploader from './app/Uploader';
import { useEffect } from 'react';
import fetchDatabase from './api/fetchDatabase';
import useApp from './hooks/useApp';
import ViewModify from './app/ViewModify';

function App() {
  const { change, setChange, database, setDatabase, isLoading } = useApp();

  useEffect(() => {
    const updateDatabaseView = async () => {
      const res = await fetchDatabase();
      setDatabase(res.data);
    };
    updateDatabaseView();
  }, [change]);

  return (
    <div>
      <h1>DIY IMG</h1>
      <Uploader setChange={setChange} />
      {isLoading && <h1>Requesting Images</h1>}
      {!isLoading && Object.keys(database).length > 0 && (
        <ViewModify database={database} setChange={setChange} />
      )}
      {!isLoading && Object.keys(database).length === 0 && (
        <p>Database currently empty! Add an image to display content.</p>
      )}
    </div>
  );
}

export default App;

// image order

// On initial load, ask for PW, use state to reveal main section, or implement full auth system?

//   Use state to set how many images are to be displayed and which are
//   currently displayed
