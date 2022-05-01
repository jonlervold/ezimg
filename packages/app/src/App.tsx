import './App.css';
import { useEffect, useState } from 'react';
import PaginationNavigation from './components/PaginationNavigation';
import axios from 'axios';
import FileDisplay from './components/FileDisplay';
import { loadingObject } from './loadingObject';
import AddAFile from './components/AddAFile';
import Uploader from './app/Uploader';

function App() {
  const serverUrl = 'http://localhost:3333';

  return (
    <div>
      <Uploader />
      <FileDisplay serverUrl={serverUrl} />
    </div>
  );

  // return (
  //   <div>
  //     <h1>DIY IMG</h1>
  //     <AddAFile
  //       stateData={stateData}
  //       setStateData={setStateData}
  //       database={database}
  //     />
  //     <br />
  //     <br />
  //     <FileDisplay serverUrl={serverUrl} database={database} />
  //     {/* <PaginationNavigation /> */}
  //     {/* <br />
  //     <br /> */}
  //   </div>
  // );
}

export default App;

// On initial load, ask for PW, use state to reveal main section

//   Use state to set how many images are to be displayed and which are
//   currently displayed, display of upload new will also be a state
