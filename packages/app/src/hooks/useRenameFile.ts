import { SetStateAction, useState } from 'react';
import fetchDatabase from '../api/fetchDatabase';
import renameFile from '../api/renameFile';

const useRenameFile = (
  filename: string,
  extension: string,
  setChange: React.Dispatch<SetStateAction<string>>,
  setError: React.Dispatch<SetStateAction<string | undefined>>
) => {
  const [value, setValue] = useState<string>('');
  const onClick = async () => {
    setError(undefined);
    try {
      if (value === '') throw new Error('Name cannot be blank');
      const res = await fetchDatabase();
      if (value in res.data) throw new Error('Name already in database');
      const answer = await renameFile(value, filename, extension);
      setValue('');
      setChange(answer);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };
  return { value, setValue, onClick };
};

export default useRenameFile;
