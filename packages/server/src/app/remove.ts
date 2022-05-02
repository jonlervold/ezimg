import { Express } from 'express';
import getNewDatabase from '../util/getNewDatabase';
import * as fs from 'fs';

const remove = (app: Express) => {
  app.delete('/remove', async (req, res) => {
    console.log(req.body.filename);

    const database = JSON.parse(fs.readFileSync('./data.json').toString());
    delete database[req.body.filename];
    fs.writeFileSync('./data.json', JSON.stringify(database));
    const path = `./user_content/images/${req.body.filename}.${req.body.extension}`;
    fs.unlinkSync(path);
  });
};

export default remove;
