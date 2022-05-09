import axios from 'axios';

const removeFile = async (filename: string, extension: string) => {
  await axios.delete('http://localhost:3333/remove', {
    data: { filename, extension },
  });
};

export default removeFile;
