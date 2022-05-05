import axios from 'axios';
import FileListing from '../types/FileListingDetails';

const fetchFiles = async () => {
  const res = await axios.get<{ files: FileListing[] }>(
    'http://localhost:3333/database'
  );
  return res.data;
};

export default fetchFiles;
