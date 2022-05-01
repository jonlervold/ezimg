import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadingObject } from '../loadingObject';
import { database } from '../types/databaseInterface';

type Props = {
  serverUrl: string;
};

const FileDisplay = ({ serverUrl }: Props) => {
  const [database, setDatabase] = useState<database>(loadingObject);
  useEffect(() => {
    const fetchDatabase = async () => {
      const res = await axios.get('http://localhost:3333/database');
      setDatabase(res.data);
    };
    fetchDatabase();
  }, []);

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
