import handleDescriptionChange from "../util/handleDescriptionChange";
import handleNewFilenameChange from "../util/handleNewFilenameChange";
import handleSelectedFileChange from "../util/handleSelectedFileChange";
import handleUploadClick from "../util/handleUploadClick";

const AddAFile = ({ stateData, setStateData, database }) => {
  return (
    <div>
      <h3>Add a File</h3>
      <input
        type="file"
        onChange={(event) =>
          handleSelectedFileChange(event, stateData, setStateData)
        }
        value={stateData.addAFile.selectedFile}
      />
      <br />
      <br />
      Choose New Filename:
      <br />
      <input
        onChange={(event) =>
          handleNewFilenameChange(event, stateData, setStateData)
        }
        value={stateData.addAFile.newFilename}
      ></input>
      <br />
      (Leave blank to use existing)
      <br />
      <br />
      Enter Description:
      <br />
      <input
        onChange={(event) =>
          handleDescriptionChange(event, stateData, setStateData)
        }
        value={stateData.addAFile.description}
      ></input>
      <br />
      <br />
      <button
        onClick={(event) =>
          handleUploadClick(event, stateData, setStateData, database)
        }
      >
        Upload
      </button>
    </div>
  );
};

export default AddAFile;
