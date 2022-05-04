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
};

const Container = styled.div`
  .error {
    color: red;
  }
`;

const RenameFile: FC<Props> = ({ filename, extension, setChange }) => {
  const { value, setValue, error, onClick } = useRenameFile(
    filename,
    extension,
    setChange
  );

  return (
    <td>
      <Container>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value.toLowerCase().replace(/[^a-z\d-]/g, '')}
        ></input>{' '}
        <button onClick={onClick}>Rename</button>
        <div className="error">{error}</div>
      </Container>
    </td>
  );
};

export default RenameFile;
