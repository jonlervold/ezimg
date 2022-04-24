export const stateTable = {
    addAFile: {
      selectedFile: "",
      newFilename: "",
      description: "",
    },
  };

  export interface stateData {
      addAFile: {
          selectedFile: string,
          newFilename: string,
          description: string
      }
  }