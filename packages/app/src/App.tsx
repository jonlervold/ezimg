import "./App.css";
import { useEffect, useState } from "react";
import PaginationNavigation from "./components/PaginationNavigation";
import axios from "axios";
import FileDisplay from "./components/FileDisplay";
import { loadingObject } from "./util/loadingObject";
import AddAFile from "./components/AddAFile";
import { stateTable } from "./stateTable";

function App() {
  const [stateData, setStateData] = useState(stateTable);
  const serverUrl = "http://localhost:3333";

  const [database, setDatabase] = useState(loadingObject);
  useEffect(() => {
    const fetchDatabase = async () => {
      const res = await axios.get("http://localhost:3333/database");
      setDatabase(res.data);
    };
    fetchDatabase();
  }, [stateData.addAFile.selectedFile]);

  return (
    <div>
      <h1>DIY IMG</h1>
      <AddAFile
        stateData={stateData}
        setStateData={setStateData}
        database={database}
      />
      <br />
      <br />
      <FileDisplay serverUrl={serverUrl} database={database} />
      {/* <PaginationNavigation /> */}
      {/* <br />
      <br /> */}
    </div>
  );
}

export default App;

// On initial load, ask for PW, use state to reveal main section

//   Use state to set how many images are to be displayed and which are
//   currently displayed, display of upload new will also be a state
