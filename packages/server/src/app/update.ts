import { Express } from 'express';
import * as fs from 'fs';
type FileInfo = {
  fileName: string;
  extension: string;
  description: string;
  msAdded: number;
};
const update = (app: Express) => {
  app.put('/update/:id', async (req, res) => {
    const fileId = req.params.id;
    const newFileName = req.body.newFileInfo.newFileName;
    const newDescription = req.body.newFileInfo.newDescription;
    const database = JSON.parse(fs.readFileSync('./data.json').toString()) as {
      [key: string]: FileInfo;
    };
    const previousValues = database[fileId];
    const updatedDatabase = {
      ...database,
      [newFileName]: {
        ...previousValues,
        fileName: newFileName,
        description: newDescription,
      },
    };
    const hasFileNameChanged = fileId !== newFileName;
    if (hasFileNameChanged) {
      delete updatedDatabase[fileId];
    }

    fs.writeFileSync('./data.json', JSON.stringify(updatedDatabase));

    const oldPath = `./user_content/images/${fileId}.${database[fileId].extension}`;
    const newPath = `./user_content/images/${newFileName}.${database[fileId].extension}`;
    fs.renameSync(oldPath, newPath);

    return res.sendStatus(hasFileNameChanged ? 200 : 201);

    // if(database[req.body.filename]){
    //   database[req.body.filename] = {
    //     ...database[req.body.filename],

    //   }
    // }else{
    //   throw new Error("Cannot find file")
    // }

    // database[req.body.value].fileName = req.body.value;

    // delete database[req.body.filename];

    // fs.writeFileSync('./data.json', JSON.stringify(database));

    // res.send(Date.now().toString());
  });
};

export default update;
