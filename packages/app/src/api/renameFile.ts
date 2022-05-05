import axios from 'axios';

const renameFile = async (
  id: string,
  newFileName: string,
  newDescription: string
) => {
  const newFileInfo = { newFileName, newDescription };
  await axios.put(`http://localhost:3333/rename/${id}`, {
    newFileInfo,
  });
};

export default renameFile;
