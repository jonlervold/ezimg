/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from "cors";
import * as database from "./services/database"

const app = express();

app.use(cors());

app.use(express.static("./packages/server/public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is active");
});

app.get("/database", (req, res) => {
  res.send(database.get());
});

app.put("/database", (req, res) => {
  res.send("Received PUT request in /database");
  // needs to actually update the database here... HOW?
  console.log(req.body); // ??
  database.set(req.body);
});


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
