import * as fs from 'fs';

const getNewDatabase = (
  title: string,
  extension: string,
  description: string
) => {
  const database = JSON.parse(fs.readFileSync('./data.json').toString());

  // if no description, add default
  if (description === '') {
    description = 'No description entered at time of upload.';
  }

  // pull upload date
  const dateObject = new Date();
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const currentDate = `${month}/${date}/${year}`;

  const newDatabase = {
    ...database,
    [title]: {
      fileName: title,
      extension: extension,
      description: description,
      dateAdded: currentDate,
    },
  };

  return newDatabase;
};

export default getNewDatabase;
