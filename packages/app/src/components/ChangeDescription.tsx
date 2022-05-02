import { FC, useState } from 'react';
import changeFileDescription from '../api/changeFileDescription';

type Props = {
  filename: string;
  extension: string;
};

const ChangeDescription: FC<Props> = ({ filename, extension }) => {
  const [value, setValue] = useState<string>('');
  const onClick = () => {
    changeFileDescription(value, filename, extension);
    setValue('');
  };
  return (
    <td>
      <input onChange={(e) => setValue(e.target.value)} value={value}></input>{' '}
      <button onClick={() => onClick()}>Change</button>
    </td>
  );
};

export default ChangeDescription;
