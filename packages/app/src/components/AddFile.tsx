import { FC } from 'react';
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
  const onInputChange = (key: 'title' | 'description', inputValue: string) => {
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
      title: filename.basename,
      extension: filename.extension,
      file,
    });
  };

  return (
    <Container>
      <div className="form-row">
        <label>Upload File</label>
        <input type="file" onChange={(e) => handleFileInput(e.target.files)} />
        {error && <p className="form-row-error">{error}</p>}
      </div>
      <div className="form-row">
        <label>Name</label>
        <input
          type="text"
          value={value.title}
          onChange={(e) => onInputChange('title', e.target.value.toLowerCase())}
        />{' '}
        .{value.extension}
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea
          value={value.description}
          onChange={(e) => onInputChange('description', e.target.value)}
        />
      </div>
      <div className="form-row">
        {/* disabled should be dependent on if a file is present */}
        <button onClick={onAddRequest} disabled={false}>
          Add File
        </button>
      </div>
    </Container>
  );
};

export default AddFile;
