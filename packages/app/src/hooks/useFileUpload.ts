import { useState } from 'react';
import uploadFile from '../api/uploadFile';
import FileUpload from '../types/FileUpload';

const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState<FileUpload>({
    title: '',
    extension: '',
    description: '',
  });

  const handleUpload = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      if (!value.file) throw new Error('File is required');
      await uploadFile(
        value.title,
        value.extension,
        value.description,
        value.file
      );
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setIsLoading(false);
  };
  return {
    value,
    error,
    loading: isLoading,
    onChange: setValue,
    upload: handleUpload,
  };
};

export default useFileUpload;
