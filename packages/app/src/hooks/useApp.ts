import { useState } from 'react';
import { loadingObject } from '../loadingObject';
import { database } from '../types/Database';

const useApp = () => {
  const serverUrl = 'http://localhost:3333';
  const [change, setChange] = useState('');
  const [database, setDatabase] = useState<database>(loadingObject);
  const isLoading = 'loading' in database && database['loading'].msAdded === 0;
  return {
    serverUrl,
    change,
    setChange,
    database,
    setDatabase,
    isLoading,
  };
};

export default useApp;
