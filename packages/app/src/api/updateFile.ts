import axios from 'axios';

const updateFile = async (
  id: string,
  newFileName: string,
  newDescription: string
) => {
  const newFileInfo = { newFileName, newDescription };
  await axios.put(`http://localhost:3333/update/${id}`, {
    newFileInfo,
  });
};

export default updateFile;
