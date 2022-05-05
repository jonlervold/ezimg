import { Express } from 'express';
import * as fs from 'fs';
type FilInfo = {
  fileName: string;
  extension: string;
  description: string;
  msAdded: number;
};
const rename = (app: Express) => {
  app.put('/rename/:id', async (req, res) => {
    const fileId = req.params.id;
    const values = req.body as { newFileName: string; extension: string };
    const database = JSON.parse(fs.readFileSync('./data.json').toString()) as {
      [key: string]: FilInfo;
    };
    const previousValues = database[fileId];
    const updatedDatabase = {
      ...database,
      [values.newFileName]: {
        ...previousValues,
        extension: values.extension,
        fileName: values.newFileName,
      },
    };
    const hasFileNameChanged = fileId !== values.newFileName;
    if (hasFileNameChanged) {
      delete updatedDatabase[fileId];
    }

    fs.writeFileSync('./data.json', JSON.stringify(updatedDatabase));

    return res.sendStatus(hasFileNameChanged ? 200 : 201);
    //

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

    // const oldPath = `./user_content/images/${req.body.filename}.${req.body.extension}`;
    // const newPath = `./user_content/images/${req.body.value}.${req.body.extension}`;
    // fs.renameSync(oldPath, newPath);
    // res.send(Date.now().toString());
  });
};

export default rename;
