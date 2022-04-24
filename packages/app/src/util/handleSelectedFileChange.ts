import { stateData } from "../stateTable";

const handleSelectedFileChange = (event: React.ChangeEvent<HTMLInputElement>, stateData: stateData, setStateData: React.Dispatch<React.SetStateAction<stateData>>) => {
  console.log(event)  
  const newState = {
      ...stateData,
      addAFile: {
        ...stateData.addAFile,
        selectedFile: event.target.value,
      },
    };
    setStateData(newState);
  };
  
  export default handleSelectedFileChange;
  