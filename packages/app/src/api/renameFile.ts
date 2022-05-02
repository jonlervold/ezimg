import axios from 'axios';

const renameFile = (value: string, filename: string, extension: string) => {
  axios.put('http://localhost:3333/rename', { value, filename, extension });
};

export default renameFile;
