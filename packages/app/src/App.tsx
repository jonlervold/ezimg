import './App.css';
import FileDisplay from './components/FileDisplay';
import Uploader from './app/Uploader';
import { useState } from 'react';

function App() {
  const serverUrl = 'http://localhost:3333';
  const [refresh, setRefresh] = useState<number>(0);
  console.log('app', refresh);

  return (
    <div>
      <Uploader refresh={refresh} setRefresh={setRefresh} />
      <FileDisplay serverUrl={serverUrl} refresh={refresh} />
    </div>
  );
}

export default App;

// On initial load, ask for PW, use state to reveal main section

//   Use state to set how many images are to be displayed and which are
//   currently displayed, display of upload new will also be a state
