import { Express } from 'express';
import * as fs from 'fs';

const changeDescription = (app: Express) => {
  app.put('/changeDescription', async (req, res) => {
    const database = JSON.parse(fs.readFileSync('./data.json').toString());

    database[req.body.filename] = {
      ...database[req.body.filename],
      description: req.body.value,
    };

    fs.writeFileSync('./data.json', JSON.stringify(database));
    res.send(Date.now().toString());
  });
};

export default changeDescription;
