import axios from 'axios';

const changeFileDescription = (
  value: string,
  filename: string,
  extension: string
) => {
  axios.put('http://localhost:3333/changeDescription', {
    value,
    filename,
    extension,
  });
};

export default changeFileDescription;
