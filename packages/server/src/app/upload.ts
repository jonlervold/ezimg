import { Express } from 'express';
import * as multer from 'multer';
import getNewDatabase from '../util/getNewDatabase';
import * as database from '../services/database';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './user_content/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.title}.${req.body.extension}`);
  },
});

const uploader = multer({ storage: storage });

const upload = (app: Express) => {
  app.post('/upload', uploader.single('file'), async (req, res) => {
    const fileRequest = req as unknown as {
      file: File | undefined;
      body:
        | { title: string; extension: string; description: string }
        | undefined;
    };
    const file = fileRequest.file;
    if (!file) {
      return res.sendStatus(500).end();
    }

    const newDatabase = getNewDatabase(
      fileRequest.body.title,
      fileRequest.body.extension,
      fileRequest.body.description
    );

    database.update(newDatabase);
    res.send(Date.now().toString());
    res.end();
  });
};

export default upload;
