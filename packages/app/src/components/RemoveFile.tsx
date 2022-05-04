import { FC, SetStateAction } from 'react';
import removeFile from '../api/removeFile';

type Props = {
  filename: string;
  extension: string;
  setChange: React.Dispatch<SetStateAction<string>>;
  setError: React.Dispatch<SetStateAction<string | undefined>>;
};

const RemoveFile: FC<Props> = ({
  filename,
  extension,
  setChange,
  setError,
}) => {
  const onClick = async () => {
    const answer = await removeFile(filename, extension);
    setChange(answer);
    setError(undefined);
  };
  return (
    <td>
      <button onClick={onClick}>
        Remove {filename}.{extension}
      </button>
    </td>
  );
};

export default RemoveFile;
