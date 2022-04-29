import { FC, useState } from 'react';
import AddFile from '../components/AddFile';
import useFileUpload from '../hooks/useFileUpload';
import FileUpload from '../types/FileUpload';

const Uploader: FC = () => {
  const { value, error, loading, onChange, upload } = useFileUpload();
  return (
    <div>
      <AddFile
        value={value}
        error={error}
        onChange={onChange}
        onAddRequest={upload}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Uploader;