import { FC, SetStateAction } from 'react';
import { database } from '../types/Database';
import SingleFileTable from './SingleFileTable';

type Props = {
  database: database;
  fileKeys: Array<string>;
  setChange: React.Dispatch<SetStateAction<string>>;
};

const FileDisplay: FC<Props> = ({ database, fileKeys, setChange }) => {
  const tables = fileKeys.map((key: string, index: number) => (
    <div key={index}>
      <SingleFileTable database={database} setChange={setChange} id={key} />
    </div>
  ));
  return <div>{tables}</div>;
};

export default FileDisplay;
