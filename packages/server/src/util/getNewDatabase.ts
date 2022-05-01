import * as fs from 'fs';

const getNewDatabase = (title: string, description: string) => {
  const database = JSON.parse(fs.readFileSync('./data.json').toString());

  // get filename and extension from path
  const lastInstanceOfPeriod = title.lastIndexOf('.');
  const prePeriod = title.slice(0, lastInstanceOfPeriod);
  const lastBackslash = prePeriod.lastIndexOf('\\');
  const filename = prePeriod.slice(lastBackslash + 1);
  const extension = title.slice(lastInstanceOfPeriod + 1).toLowerCase();

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
    [filename]: {
      fileName: filename,
      extension: extension,
      description: description,
      dateAdded: currentDate,
    },
  };

  return newDatabase;
};

export default getNewDatabase;
