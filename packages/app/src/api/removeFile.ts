import axios from 'axios';

const removeFile = (filename: string, extension: string) => {
  axios.delete('http://localhost:3333/remove', {
    data: { filename, extension },
  });
};

export default removeFile;
