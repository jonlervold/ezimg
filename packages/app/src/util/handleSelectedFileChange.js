const handleSelectedFileChange = (event, stateData, setStateData) => {
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
