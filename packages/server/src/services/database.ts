import * as fs from 'fs';

export const get = () => {
  return JSON.parse(fs.readFileSync('./data.json').toString());
};
