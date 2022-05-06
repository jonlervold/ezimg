import * as database from '../services/database';
import { Express } from 'express';
import upload from './upload';
import remove from './remove';
import update from './update';

const app = (app: Express) => {
  const routes = [upload, remove, update];
  for (const route of routes) {
    route(app);
  }
  app.get('/', (req, res) => {
    res.send('server is active');
  });

  app.get('/database', (req, res) => {
    const data = database.get();
    res.json({ files: Object.values(data) });
  });
};

export default app;
