import { useState, useCallback, useEffect } from 'react';
import fetchFiles from '../api/fetchFiles';
import CompleteFileInfo from '../types/CompleteFileInfo';

const useFetchRender = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [files, setFiles] = useState<CompleteFileInfo[]>([]);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const { files } = await fetchFiles();
      setFiles(files);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { isLoading, files, fetch, errorMessage };
};

export default useFetchRender;
