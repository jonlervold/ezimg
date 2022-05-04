import { FC, SetStateAction, useState } from 'react';
import { getSystemErrorName } from 'util';
import changeFileDescription from '../api/changeFileDescription';

type Props = {
  filename: string;
  extension: string;
  setChange: React.Dispatch<SetStateAction<string>>;
  setError: React.Dispatch<SetStateAction<string | undefined>>;
};

const ChangeDescription: FC<Props> = ({
  filename,
  extension,
  setChange,
  setError,
}) => {
  const [value, setValue] = useState<string>('');
  const onClick = async () => {
    const answer = await changeFileDescription(value, filename, extension);
    setValue('');
    setChange(answer);
    setError(undefined);
  };
  return (
    <td>
      <input onChange={(e) => setValue(e.target.value)} value={value}></input>{' '}
      <button onClick={onClick}>Change</button>
    </td>
  );
};

export default ChangeDescription;
