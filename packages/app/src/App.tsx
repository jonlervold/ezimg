import './App.css';
import FileDisplay from './components/FileDisplay';
import Uploader from './app/Uploader';
import { useEffect, useState } from 'react';
import fetchDatabase from './api/fetchDatabase';
import { loadingObject } from './loadingObject';
import { database } from './types/Database';

function App() {
  const serverUrl = 'http://localhost:3333';
  const [change, setChange] = useState('');
  const [database, setDatabase] = useState<database>(loadingObject);
  const isLoading = 'loading' in database && database['loading'].msAdded === 0;

  useEffect(() => {
    const updateDatabaseView = async () => {
      const res = await fetchDatabase();
      setDatabase(res.data);
    };
    updateDatabaseView();
  }, [change]);

  return (
    <div>
      <Uploader setChange={setChange} />
      {isLoading && <h1>Requesting Images</h1>}
      {!isLoading && (
        <FileDisplay
          serverUrl={serverUrl}
          database={database}
          setChange={setChange}
        />
      )}
    </div>
  );
}

export default App;

// if duplicate filename, append something
// don't allow symbols in file name field only lower letters and numbers

// image order

// On initial load, ask for PW, use state to reveal main section, or implement full auth system?

//   Use state to set how many images are to be displayed and which are
//   currently displayed
