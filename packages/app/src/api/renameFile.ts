import axios from 'axios';

const renameFile = async (
  id: string,
  newFileName: string,
  extension: string
) => {
  await axios.put(`http://localhost:3333/rename/${id}`, {
    newFileName,
    extension,
  });
};

export default renameFile;
