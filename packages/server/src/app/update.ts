import { Express } from 'express';
import * as fs from 'fs';
import * as database from '../services/database';

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
    const data = database.get();

    const previousValues = data[fileId];

    const updatedData = {
      ...data,
      [newFileName]: {
        ...previousValues,
        fileName: newFileName,
        description: newDescription,
      },
    };

    const hasFileNameChanged = fileId !== newFileName;
    if (hasFileNameChanged) {
      delete updatedData[fileId];
    }

    database.update(updatedData);

    const oldPath = `./user_content/images/${fileId}.${data[fileId].extension}`;
    const newPath = `./user_content/images/${newFileName}.${data[fileId].extension}`;

    database.changePath(oldPath, newPath);

    return res.sendStatus(hasFileNameChanged ? 200 : 201);
  });
};

export default update;
