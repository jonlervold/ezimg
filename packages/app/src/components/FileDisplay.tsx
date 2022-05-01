import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchDatabase from '../api/fetchDatabase';
import { loadingObject } from '../loadingObject';
import { database } from '../types/Database';

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
          </tr>
          <tr>
            <td>Description:</td>
            <td>{database[key].description}</td>
          </tr>
          <tr>
            <td>URL:</td>
            <td>
              {serverUrl}/images/{database[key].fileName}.
              {database[key].extension}
            </td>
          </tr>
        </tbody>
      </table>
      <button>
        Remove {database[key].fileName}.{database[key].extension}
      </button>
      <br />
      <br />
    </div>
  ));
  return <div>{tables}</div>;
};

export default FileDisplay;
