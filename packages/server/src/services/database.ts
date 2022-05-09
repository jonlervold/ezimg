import * as fs from 'fs';

export const get = () => {
  return JSON.parse(fs.readFileSync('./data.json').toString());
};

export const update = (newDatabase) => {
  fs.writeFileSync('./data.json', JSON.stringify(newDatabase));
};

export const changePath = (oldPath, newPath) => {
  fs.renameSync(oldPath, newPath);
};

export const deleteFile = (path) => {
  fs.unlinkSync(path);
};
