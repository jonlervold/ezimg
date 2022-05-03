import { FC, useEffect, useState } from 'react';
import fetchDatabase from '../api/fetchDatabase';
import { loadingObject } from '../loadingObject';
import { database } from '../types/Database';
import removeFile from '../api/removeFile';
import RenameFile from './RenameFile';
import ChangeDescription from './ChangeDescription';

type Props = {
  serverUrl: string;
  database: database;
};

const FileDisplay: FC<Props> = ({ serverUrl, database }) => {
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
            <td>Added:</td>
            <td>{database[key].dateAdded}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              {database[key].fileName}.{database[key].extension}
            </td>
            <RenameFile
              filename={database[key].fileName}
              extension={database[key].extension}
            />
          </tr>
          <tr>
            <td>Description:</td>
            <td>{database[key].description}</td>
            <ChangeDescription
              filename={database[key].fileName}
              extension={database[key].extension}
            />
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
