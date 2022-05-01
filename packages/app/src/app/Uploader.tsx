import { FC, SetStateAction } from 'react';
import AddFile from '../components/AddFile';
import useFileUpload from '../hooks/useFileUpload';

interface Props {
  refresh: number;
  setRefresh: React.Dispatch<SetStateAction<number>>;
}

const Uploader: FC<Props> = ({ refresh, setRefresh }) => {
  const { value, error, loading, onChange, upload } = useFileUpload();

  return (
    <div>
      <AddFile
        value={value}
        error={error}
        onChange={onChange}
        onAddRequest={upload}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Uploader;
