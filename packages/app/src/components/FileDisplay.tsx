import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchDatabase from '../api/fetchDatabase';
import { loadingObject } from '../loadingObject';
import { database } from '../types/Database';
import removeFile from '../api/removeFile';

type Props = {
  serverUrl: string;
};

const FileDisplay = ({ serverUrl }: Props) => {
  const [database, setDatabase] = useState<database>(loadingObject);

  const updateDatabaseView = async () => {
    const res = await fetchDatabase();
    setDatabase(res.data);
  };
  updateDatabaseView();

  const fileKeys: Array<string> = Object.keys(database);

  const tables = fileKeys.reverse().map((key: string, index: number) => (
    <div key={index}>
      <img
        src={`${serverUrl}/images/${database[key].fileName}.${database[key].extension}`}
        alt={`${database[key].description}`}
      ></img>
      <table>
        <tbody>
          <tr>
            <td>Date Added:</td>
            <td>{database[key].dateAdded}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              {database[key].fileName}.{database[key].extension}
            </td>
            <td>
              <input></input> <button>Rename</button>
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{database[key].description}</td>
            <td>
              <input></input> <button>Change Description</button>
            </td>
          </tr>
          <tr>
            <td>URL:</td>
            <td>
              {serverUrl}/images/{database[key].fileName}.
              {database[key].extension}
            </td>
            <td>
              {' '}
              <button
                onClick={() =>
                  removeFile(database[key].fileName, database[key].extension)
                }
              >
                Remove {database[key].fileName}.{database[key].extension}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
  return <div>{tables}</div>;
};

export default FileDisplay;
