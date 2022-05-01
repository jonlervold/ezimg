// import { Base } from './../../../app/src/components/AddFile.stories';
import { Express } from 'express';
import { writeFileSync } from 'fs';
import * as multer from 'multer';
import getNewDatabase from '../util/getNewDatabase';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './user_content/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage: storage });

const upload = (app: Express) => {
  app.post('/upload', uploader.single('file'), async (req, res) => {
    const fileRequest = req as unknown as {
      file: {} | undefined;
      body: { title: string; description: string } | undefined;
    };
    const file = fileRequest.file;
    if (!file) {
      return res.sendStatus(500).end();
    }
    // console.log({ file }, typeof file);

    const title = fileRequest.body.title;
    const description = fileRequest.body.description;

    const newDatabase = getNewDatabase(title, description);
    fs.writeFileSync('./data.json', JSON.stringify(newDatabase));

    res.end();
  });
};

export default upload;
