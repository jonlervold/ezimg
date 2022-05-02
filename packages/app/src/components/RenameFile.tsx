import { FC, useState } from 'react';
import renameFile from '../api/renameFile';

type Props = {
  filename: string;
  extension: string;
};

const RenameFile: FC<Props> = ({ filename, extension }) => {
  const [value, setValue] = useState<string>('');
  const onClick = () => {
    renameFile(value, filename, extension);
    setValue('');
  };
  return (
    <>
      <td>
        <input onChange={(e) => setValue(e.target.value)} value={value}></input>{' '}
        <button onClick={() => onClick()}>Rename</button>
      </td>
      ;
    </>
  );
};

export default RenameFile;
