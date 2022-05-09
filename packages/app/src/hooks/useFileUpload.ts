import { useState } from 'react';
import fetchFiles from '../api/fetchFiles';
import uploadFile from '../api/uploadFile';
import FileUpload from '../types/FileUpload';
import getNameAndExtension from '../util/getNameAndExtension';

const useFileUpload = (fetch: () => Promise<void>) => {
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
    await fetch();
    setIsLoading(false);
    setUploadInfo({
      title: '',
      extension: '',
      description: '',
    });
  };

  const onTitleChange = (key: 'title', inputValue: string) => {
    setUploadInfo({
      ...uploadInfo,
      [key]: inputValue.replace(/[^a-z\d-]/g, ''),
    });
  };
  const onDescriptionChange = (key: 'description', inputValue: string) => {
    setUploadInfo({
      ...uploadInfo,
      [key]: inputValue,
    });
  };
  const handleFileInput = (files: FileList | null) => {
    if (files === null) return;
    if (files.item.length !== 1) return;
    const file: File = files[0];
    const filename = getNameAndExtension(file);
    setUploadInfo({
      ...uploadInfo,
      title: filename.basename.replace(/[^a-z\d-]/g, ''),
      extension: filename.extension,
      file,
    });
  };
  return {
    uploadInfo,
    errorMessage,
    isLoading,
    handleUpload,
    onTitleChange,
    onDescriptionChange,
    handleFileInput,
  };
};

export default useFileUpload;
