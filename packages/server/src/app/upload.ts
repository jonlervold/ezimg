import { Express } from 'express';
import { writeFileSync } from 'fs';
import * as multer from 'multer';

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
    console.log('hello');
    console.log({ req });
    const fileRequest = req as unknown as { file: {} | undefined };
    const file = fileRequest.file;
    if (!file) {
      return res.sendStatus(500).end();
    }
    // const buffer = await file.arrayBuffer();
    console.log({ file }, typeof file);
    // ${req.body.title as string}
    // writeFileSync(
    //   `./user_content/images/ads`,
    //   buffer
    // );

    res.end();
  });
};

export default upload;
