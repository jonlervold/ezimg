import axios from 'axios';

const uploadFile = async (
  title: string,
  extension: string,
  description: string,
  file: File
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('extension', extension);
  formData.append('description', description);
  formData.append('file', file);

  await axios.post('http://localhost:3333/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default uploadFile;
