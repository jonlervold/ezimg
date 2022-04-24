import { stateData } from "../stateTable";

const handleNewFilenameChange = (event: React.ChangeEvent<HTMLInputElement>, stateData: stateData, setStateData: React.Dispatch<React.SetStateAction<stateData>>) => {
    const newState = {
      ...stateData,
      addAFile: {
        ...stateData.addAFile,
        newFilename: event.target.value,
      },
    };
    setStateData(newState);
  };
  
  export default handleNewFilenameChange;