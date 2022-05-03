import { FC, SetStateAction } from 'react';
import styled from 'styled-components';
import FileUpload from '../types/FileUpload';
import getNameAndExtension from '../util/getNameAndExtension';

type Props = {
  value: FileUpload;
  error?: string;
  onChange: (value: FileUpload) => void;
  onAddRequest: () => void;
};

const Container = styled.div`
  .form-row {
    padding: 0.5rem 1rem;
    .form-row-error {
      color: red;
    }
  }
  label {
    display: block;
  }
`;

const AddFile: FC<Props> = ({ value, error, onChange, onAddRequest }) => {
  const onTitleChange = (key: 'title', inputValue: string) => {
    onChange({
      ...value,
      [key]: inputValue.replace(/[^a-z\d-]/g, ''),
    });
  };
  const onDescriptionChange = (key: 'description', inputValue: string) => {
    onChange({
      ...value,
      [key]: inputValue,
    });
  };
  const handleFileInput = (files: FileList | null) => {
    if (files === null) return;
    if (files.item.length !== 1) return;
    const file: File = files[0];
    const filename = getNameAndExtension(file);
    onChange({
      ...value,
      title: filename.basename.replace(/[^a-z\d-]/g, ''),
      extension: filename.extension,
      file,
    });
  };

  return (
    <Container>
      <div className="form-row">
        <label>Upload File</label>
        <label>.jpg, .jpeg, .tif, .tiff, .png, .bmp, .gif</label>
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
          value={value.title}
          onChange={(e) => onTitleChange('title', e.target.value.toLowerCase())}
        />{' '}
        {value.extension !== '' && '.'}
        {value.extension}
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea
          value={value.description}
          onChange={(e) => onDescriptionChange('description', e.target.value)}
        />
      </div>
      <div className="form-row">
        <button
          onClick={onAddRequest}
          disabled={value.title === '' || !value.file}
        >
          Add File
        </button>
        {error && <p className="form-row-error">{error}</p>}
      </div>
    </Container>
  );
};

export default AddFile;
