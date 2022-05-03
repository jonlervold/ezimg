import axios from 'axios';

const removeFile = async (filename: string, extension: string) => {
  let answer = 'failure';
  await axios
    .delete('http://localhost:3333/remove', {
      data: { filename, extension },
    })
    .then((response) => {
      answer = response.data;
    });
  return answer;
};

export default removeFile;
