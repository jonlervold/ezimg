import * as fs from 'fs';

const getNewDatabase = (
  title: string,
  extension: string,
  description: string
) => {
  const database = JSON.parse(fs.readFileSync('./data.json').toString());

  // if (description === '') {
  //   description = 'None';
  // }

  const dateObject = new Date();
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  let hour = dateObject.getHours().toString();
  if (hour.length < 2) {
    hour = `0${hour}`;
  }
  let minute = dateObject.getMinutes().toString();
  if (minute.length < 2) {
    minute = `0${minute}`;
  }
  let second = dateObject.getSeconds().toString();
  if (second.length < 2) {
    second = `0${second}`;
  }

  const currentDate = `${month}/${date}/${year} @ ${hour}:${minute}:${second}`;

  const msAdded = Date.now();

  const newDatabase = {
    ...database,
    [title]: {
      fileName: title,
      extension: extension,
      description: description,
      dateAdded: currentDate,
      msAdded,
    },
  };

  return newDatabase;
};

export default getNewDatabase;
