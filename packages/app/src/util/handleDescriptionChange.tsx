import { stateData } from "../stateTable";

const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>, stateData: stateData, setStateData: React.Dispatch<React.SetStateAction<stateData>>) => {
    const newState = {
      ...stateData,
      addAFile: {
        ...stateData.addAFile,
        description: event.target.value,
      },
    };
    setStateData(newState);
  };
  
  export default handleDescriptionChange;
  