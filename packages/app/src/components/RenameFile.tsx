import { FC, SetStateAction, useState } from 'react';
import renameFile from '../api/renameFile';

type Props = {
  filename: string;
  extension: string;
  setChange: React.Dispatch<SetStateAction<string>>;
};

const RenameFile: FC<Props> = ({ filename, extension, setChange }) => {
  const [value, setValue] = useState<string>('');
  const onClick = async () => {
    const answer = await renameFile(value, filename, extension);
    setValue('');
    setChange(answer);
  };
  return (
    <td>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value.replace(/[^a-z\d-]/g, '')}
      ></input>{' '}
      <button onClick={() => onClick()}>Rename</button>
    </td>
  );
};

export default RenameFile;
