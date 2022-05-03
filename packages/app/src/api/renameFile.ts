import axios from 'axios';

const renameFile = async (
  value: string,
  filename: string,
  extension: string
) => {
  let answer = 'failure';
  await axios
    .put('http://localhost:3333/rename', { value, filename, extension })
    .then((response) => {
      answer = response.data;
    });
  return answer;
};

export default renameFile;
