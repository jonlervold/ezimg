import axios from 'axios';
import { stateData } from '../stateTable';
import { database } from '../types/databaseInterface';

const handleUploadClick = (
  stateData: stateData,
  setStateData: React.Dispatch<React.SetStateAction<stateData>>,
  database: database
) => {
  // ADD if no file selected, give error and stop
  // ADD if name already in database, give error and stop

  const localFileLocation = stateData.addAFile.selectedFile;

  // get filename and extension from path
  const lastInstanceOfPeriod = localFileLocation.lastIndexOf('.');
  const prePeriod = localFileLocation.slice(0, lastInstanceOfPeriod);
  const lastBackslash = prePeriod.lastIndexOf('\\');
  let filename = prePeriod.slice(lastBackslash + 1);
  const extension = localFileLocation
    .slice(lastInstanceOfPeriod + 1)
    .toLowerCase();

  // no newFilename results in existing filename being used
  if (stateData.addAFile.newFilename !== '') {
    filename = stateData.addAFile.newFilename;
  }

  // blank description enters a default
  let description = stateData.addAFile.description;
  if (description === '') {
    description = 'No description entered at time of upload.';
  }

  // pull upload date
  const dateObject = new Date();
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const currentDate = `${month}/${date}/${year}`;

  // duplicate database and add new
  const newDatabase = {
    ...database,
    [filename]: {
      fileName: filename,
      extension: extension,
      description: description,
      dateAdded: currentDate,
    },
  };

  // temporary
  console.log('data to upload:', newDatabase);

  // replace database with new database
  // also this doesn't actually make this permanent, though, it'll lose the updates once the RAM clears...
  // and how do you store the images?

  const putDatabase = async () => {
    const res = await axios.put('http://localhost:3333/database', newDatabase);
    console.log('(handleUploadClick) response', res);
  };
  putDatabase();

  // original solution

  //   const selectedImage = (document.getElementById('fileSelect') as HTMLInputElement).files[0]

  //   const postImage = async () => {
  //     const res = await axios.post(
  //       'http://localhost:3333/user_content/images',
  //       selectedImage,
  //       { headers: { 'content-type': 'multipart/form-data' } }
  //     );
  //     console.log('postImage response', res);
  //   };
  //   postImage();

  // new solution

  const postImage = async () => {
    const fileSelectElement = document.getElementById('fileSelect') as
      | HTMLInputElement
      | undefined;
    if (!fileSelectElement) throw new Error('cannot find file element');
    if (!fileSelectElement.files) throw new Error('No Files found');
    if (!(fileSelectElement.files.length === 0))
      throw new Error('No Files found');
    if (!(fileSelectElement.files.length > 1))
      throw new Error('Only one file upload at a time is supported');
    const file = fileSelectElement.files[0];
    const res = await axios.post(
      'http://localhost:3333/user_content/images',
      file,
      { headers: { 'content-type': 'multipart/form-data' } }
    );
    console.log('postImage response', res);
  };

  try {
    postImage();
  } catch (e: unknown) {
    if ((e as Error).message) {
      const error = e as Error;
      console.error(error.message);
    } else {
      throw e;
    }
  }

  // clear file path, new filename, and description
  const newState = {
    ...stateData,
    addAFile: {
      selectedFile: '',
      newFilename: '',
      description: '',
    },
  };
  setStateData(newState);
};

export default handleUploadClick;
