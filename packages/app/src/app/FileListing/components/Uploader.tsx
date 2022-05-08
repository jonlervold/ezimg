import useFileUpload from '../../../hooks/useFileUpload';
import { FC } from 'react';
import Card from './Card';
import getNameAndExtension from '../../../util/getNameAndExtension';
import styled from 'styled-components';

type Props = {
  fetch: () => Promise<void>;
};

const Uploader: FC<Props> = ({ fetch }) => {
  const { uploadInfo, errorMessage, isLoading, setUploadInfo, handleUpload } =
    useFileUpload(fetch);

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

  return (
    <Card>
      <>
        <div className="form-row">
          <div className="subtitle">Upload File</div>
          <label className="fileTypes">
            .jpg, .jpeg, .tif, .tiff, .png, .bmp, .gif
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.tif,.tiff,.png,.bmp,.gif"
            onChange={(e) => handleFileInput(e.target.files)}
          />
        </div>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            value={uploadInfo.title}
            onChange={(e) =>
              onTitleChange('title', e.target.value.toLowerCase())
            }
          />{' '}
          {uploadInfo.extension !== '' && '.'}
          {uploadInfo.extension}
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea
            value={uploadInfo.description}
            onChange={(e) => onDescriptionChange('description', e.target.value)}
          />
        </div>
        <div className="form-row">{isLoading && 'Uploading...'}</div>
        <div className="form-row">
          <button
            onClick={handleUpload}
            disabled={uploadInfo.title === '' || !uploadInfo.file}
          >
            Add File
          </button>
          {errorMessage && <p className="form-row-error">{errorMessage}</p>}
        </div>
      </>
    </Card>
  );
};

export default Uploader;
