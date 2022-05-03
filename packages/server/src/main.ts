import * as express from 'express';
import * as cors from 'cors';
import app from './app';
const expressApp = express();
expressApp.use(cors());

expressApp.use(express.static('./packages/server/public'));
expressApp.use(express.static('./user_content'));

expressApp.use(express.json());
//load routes
app(expressApp);

const port = process.env.port || 3333;
const server = expressApp.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
