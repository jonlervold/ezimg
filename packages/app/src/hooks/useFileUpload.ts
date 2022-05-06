import { useState, SetStateAction } from 'react';
import fetchFiles from '../api/fetchFiles';
import uploadFile from '../api/uploadFile';
import FileUpload from '../types/FileUpload';

// const useFileUpload = (setChange: React.Dispatch<SetStateAction<string>>) => {
const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [uploadInfo, setUploadInfo] = useState<FileUpload>({
    title: '',
    extension: '',
    description: '',
  });

  const handleUpload = async () => {
    setErrorMessage(undefined);
    setIsLoading(true);
    try {
      if (!uploadInfo.file) throw new Error('File is required');
      if (uploadInfo.title === '') throw new Error('Name cannot be blank');
      const res = await fetchFiles();
      if (uploadInfo.title in res.files)
        throw new Error('Name already in database');
      // answer = await uploadFile(
      await uploadFile(
        uploadInfo.title,
        uploadInfo.extension,
        uploadInfo.description,
        uploadInfo.file
      );
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
    setIsLoading(false);
    setUploadInfo({
      title: '',
      extension: '',
      description: '',
    });
  };
  return {
    uploadInfo: uploadInfo,
    errorMessage: errorMessage,
    isLoading: isLoading,
    setUploadInfo: setUploadInfo,
    handleUpload: handleUpload,
  };
};

export default useFileUpload;
