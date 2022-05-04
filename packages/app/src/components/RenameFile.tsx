import { FC, SetStateAction, useState } from 'react';
import { getSystemErrorMap } from 'util';
import fetchDatabase from '../api/fetchDatabase';
import renameFile from '../api/renameFile';
import useRenameFile from '../hooks/useRenameFile';
import styled from 'styled-components';

type Props = {
  filename: string;
  extension: string;
  setChange: React.Dispatch<SetStateAction<string>>;
  setError: React.Dispatch<SetStateAction<string | undefined>>;
};

const RenameFile: FC<Props> = ({
  filename,
  extension,
  setChange,
  setError,
}) => {
  const { value, setValue, onClick } = useRenameFile(
    filename,
    extension,
    setChange,
    setError
  );

  return (
    <td>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value.toLowerCase().replace(/[^a-z\d-]/g, '')}
      ></input>{' '}
      <button onClick={onClick}>Rename</button>
    </td>
  );
};

export default RenameFile;
