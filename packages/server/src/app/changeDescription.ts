import { Express } from 'express';
import * as fs from 'fs';

const changeDescription = (app: Express) => {
  app.put('/changeDescription', async (req, res) => {
    console.log(req.body.value, req.body.filename, req.body.extension);

    const database = JSON.parse(fs.readFileSync('./data.json').toString());

    database[req.body.filename] = {
      ...database[req.body.filename],
      description: req.body.value,
    };

    fs.writeFileSync('./data.json', JSON.stringify(database));
  });
};

export default changeDescription;
