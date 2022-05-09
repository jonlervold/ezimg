import * as fs from 'fs';

const getNewDatabase = (
  title: string,
  extension: string,
  description: string
) => {
  const database = JSON.parse(fs.readFileSync('./data.json').toString());

  const msAdded = Date.now();

  const newDatabase = {
    ...database,
    [title]: {
      fileName: title,
      extension: extension,
      description: description,
      msAdded,
    },
  };

  return newDatabase;
};

export default getNewDatabase;
