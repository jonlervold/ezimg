const handleNewFilenameChange = (event, stateData, setStateData) => {
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
