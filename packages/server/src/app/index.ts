import * as database from '../services/database';
import { Express } from 'express';
import upload from './upload';
import * as fs from 'fs';

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

  app.put('/database', (req, res) => {
    res.send('Received PUT request in /database');
    // temporarily disabled to avoid adding constantly to database during tests
    // database.set(req.body);
  });

  // app.post('/user_content/images', (req, res) => {
  //   res.send('Received POST request in /user_content/images');
  //   console.log(req);
  // });
};

export default app;
