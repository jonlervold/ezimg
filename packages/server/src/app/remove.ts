import { Express } from 'express';
import * as database from '../services/database';

const remove = (app: Express) => {
  app.delete('/remove', async (req, res) => {
    const data = database.get();
    delete data[req.body.filename];
    database.update(data);

    const path = `./user_content/images/${req.body.filename}.${req.body.extension}`;
    database.deleteFile(path);

    res.send('response');
  });
};

export default remove;
