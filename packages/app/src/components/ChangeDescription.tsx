import { FC, SetStateAction, useState } from 'react';
import changeFileDescription from '../api/changeFileDescription';

type Props = {
  filename: string;
  extension: string;
  setChange: React.Dispatch<SetStateAction<string>>;
};

const ChangeDescription: FC<Props> = ({ filename, extension, setChange }) => {
  const [value, setValue] = useState<string>('');
  const onClick = async () => {
    const answer = await changeFileDescription(value, filename, extension);
    setValue('');
    setChange(answer);
  };
  return (
    <td>
      <input onChange={(e) => setValue(e.target.value)} value={value}></input>{' '}
      <button onClick={onClick}>Change</button>
    </td>
  );
};

export default ChangeDescription;
