import { FC, SetStateAction, useEffect, useState } from 'react';
import { serverUrl } from '../serverUrl';
import { database } from '../types/Database';
import ChangeDescription from './ChangeDescription';
import RemoveFile from './RemoveFile';
import RenameFile from './RenameFile';

type Props = {
  database: database;
  setChange: React.Dispatch<SetStateAction<string>>;
  id: string;
  perPage: number;
  firstImage: number;
};

const SingleFileTable: FC<Props> = ({
  database,
  setChange,
  id,
  perPage,
  firstImage,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setError(undefined);
  }, [perPage, firstImage]);

  return (
    <>
      <img
        src={`${serverUrl}/images/${database[id].fileName}.${database[id].extension}`}
        alt={`${database[id].description}`}
      ></img>
      <table>
        <tbody>
          <tr>
            <td>Added:</td>
            <td>{database[id].dateAdded}</td>
            <td>{error}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              {database[id].fileName}.{database[id].extension}
            </td>
            <RenameFile
              filename={database[id].fileName}
              extension={database[id].extension}
              setChange={setChange}
              setError={setError}
            />
          </tr>
          <tr>
            <td>Description:</td>
            <td>{database[id].description}</td>
            <ChangeDescription
              filename={database[id].fileName}
              extension={database[id].extension}
              setChange={setChange}
              setError={setError}
            />
          </tr>
          <tr>
            <td>URL:</td>
            <td>
              {serverUrl}/images/{database[id].fileName}.
              {database[id].extension}
            </td>
            <RemoveFile
              filename={database[id].fileName}
              extension={database[id].extension}
              setChange={setChange}
              setError={setError}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SingleFileTable;
