import { FC, SetStateAction } from 'react';
import AddFile from '../components/AddFile';
import useFileUpload from '../hooks/useFileUpload';

type Props = {
  setChange: React.Dispatch<SetStateAction<string>>;
};

const Uploader: FC<Props> = ({ setChange }) => {
  const { value, error, loading, onChange, upload } = useFileUpload(setChange);

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
