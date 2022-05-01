import axios from 'axios';

const fetchDatabase = () => {
  const res = axios.get('http://localhost:3333/database');
  return res;
};

export default fetchDatabase;
