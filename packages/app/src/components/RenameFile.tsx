import { FC, SetStateAction, useState } from 'react';
import { getSystemErrorMap } from 'util';
import fetchDatabase from '../api/fetchDatabase';
import renameFile from '../api/renameFile';
import useRenameFile from '../hooks/useRenameFile';

type Props = {
  filename: string;
  extension: string;
  setChange: React.Dispatch<SetStateAction<string>>;
};

const RenameFile: FC<Props> = ({ filename, extension, setChange }) => {
  const { value, setValue, error, onClick } = useRenameFile(
    filename,
    extension,
    setChange
  );

  return (
    <td>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value.toLowerCase().replace(/[^a-z\d-]/g, '')}
      ></input>{' '}
      <button onClick={() => onClick()}>Rename</button>
      <div>{error}</div>
    </td>
  );
};

export default RenameFile;
