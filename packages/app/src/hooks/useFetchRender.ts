import { useState, useCallback, useEffect } from 'react';
import fetchFiles from '../api/fetchFiles';
import CompleteFileInfo from '../types/CompleteFileInfo';

const useFetchRender = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<CompleteFileInfo[]>([]);

  const fetch = useCallback(async () => {
    const { files } = await fetchFiles();
    setFiles(files);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { isLoading, files, fetch };
};

export default useFetchRender;
