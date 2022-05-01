import * as database from '../services/database';
import { Express } from 'express';
import upload from './upload';

const app = (app: Express) => {
  const routes = [upload];
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
