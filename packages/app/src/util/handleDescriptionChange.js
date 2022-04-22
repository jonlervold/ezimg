const handleDescriptionChange = (event, stateData, setStateData) => {
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
