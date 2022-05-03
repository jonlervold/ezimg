import { Express } from 'express';
import * as fs from 'fs';

const remove = (app: Express) => {
  app.delete('/remove', async (req, res) => {
    const database = JSON.parse(fs.readFileSync('./data.json').toString());
    delete database[req.body.filename];
    fs.writeFileSync('./data.json', JSON.stringify(database));
    const path = `./user_content/images/${req.body.filename}.${req.body.extension}`;
    fs.unlinkSync(path);
    res.send(Date.now().toString());
  });
};

export default remove;
