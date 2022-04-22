/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from "cors";

const app = express();

let database = {
  experiencedthings: {
    fileName: "experiencedthings",
    extension: "jpg",
    description: "text saying you have just experienced things",
    dateAdded: "04/11/2022",
  },
  literalspongebob: {
    fileName: "literalspongebob",
    extension: "jpg",
    description: "really bad spongebob costume made of actual sponges",
    dateAdded: "04/11/2022",
  },
};

app.use(cors());

app.use(express.static("./packages/server/public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is active");
});

app.get("/database", (req, res) => {
  res.send(database);
});

app.put("/database", (req, res) => {
  res.send("Received PUT request in /database");
  // needs to actually update the database here... HOW?
  console.log(req.body); // ??
  database = req.body;
});


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
