import { Express } from 'express';
import * as fs from 'fs';

const rename = (app: Express) => {
  app.put('/rename', async (req, res) => {
    console.log(req.body.value, req.body.filename, req.body.extension);

    const database = JSON.parse(fs.readFileSync('./data.json').toString());

    database[req.body.value] = database[req.body.filename];
    database[req.body.value].fileName = req.body.value;

    delete database[req.body.filename];

    fs.writeFileSync('./data.json', JSON.stringify(database));

    const oldPath = `./user_content/images/${req.body.filename}.${req.body.extension}`;
    const newPath = `./user_content/images/${req.body.value}.${req.body.extension}`;
    fs.renameSync(oldPath, newPath);
  });
};

export default rename;
