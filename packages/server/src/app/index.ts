import * as database from '../services/database';
import { Express } from 'express';
import upload from './upload';
import remove from './remove';
import rename from './rename';
import changeDescription from './changeDescription';

const app = (app: Express) => {
  const routes = [upload, remove, rename, changeDescription];
  for (const route of routes) {
    route(app);
  }
  app.get('/', (req, res) => {
    res.send('server is active');
  });

  app.get('/database', (req, res) => {
    const data = database.get();
    res.json({ files: Object.values(data).slice(0, 1) });
  });
};

export default app;
