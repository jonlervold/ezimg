import useFileUpload from '../../../hooks/useFileUpload';
import { FC } from 'react';
import Card from '../../../components/styles/Card';

type Props = {
  fetch: () => Promise<void>;
};

const Uploader: FC<Props> = ({ fetch }) => {
  const {
    uploadInfo,
    errorMessage,
    setErrorMessage,
    isLoading,
    handleUpload,
    onTitleChange,
    onDescriptionChange,
    handleFileInput,
    chosenFile,
  } = useFileUpload(fetch);

  return (
    <Card>
      <>
        <div className="form-row">
          <div className="subtitle">Upload File</div>
          <label className="fileTypes">
            .jpg, .jpeg, .tif, .tiff, .png, .bmp, .gif
          </label>
          <label className="custom-file-input">
            Select File
            <input
              type="file"
              accept=".jpg,.jpeg,.tif,.tiff,.png,.bmp,.gif"
              onChange={(e) => handleFileInput(e.target.files)}
            />
          </label>
          <div>{chosenFile}</div>
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

          <div className="error">
            {errorMessage}
            {errorMessage !== undefined && (
              <span>
                {' '}
                <span
                  style={{ cursor: 'pointer' }}
                  role="img"
                  aria-label="Close Error"
                  onClick={() => setErrorMessage(undefined)}
                >
                  ❌
                </span>
              </span>
            )}
          </div>
        </div>
      </>
    </Card>
  );
};

export default Uploader;
