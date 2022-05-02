import * as database from '../services/database';
import { Express } from 'express';
import upload from './upload';
import remove from './remove';
import rename from './rename';

const app = (app: Express) => {
  const routes = [upload, remove, rename];
  for (const route of routes) {
    route(app);
  }
  app.get('/', (req, res) => {
    res.send('server is active');
  });

  app.get('/database', (req, res) => {
    res.send(database.get());
  });
};

export default app;
